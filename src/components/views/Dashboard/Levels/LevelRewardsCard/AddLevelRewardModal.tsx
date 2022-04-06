import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'next-i18next';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	TextField,
} from '@mui/material';

import RoleSelect from '@components/Inputs/RoleSelect';

import type { LevelReward, Role } from 'types';

interface IProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	roles: Role[];
	addRole: (reward: LevelReward) => void;
}

interface IAddReward {
	level: number;
	roleId: string;
	takePreviousRole: boolean;
}

export default function AddLevelRewardModal({ open, setOpen, roles, addRole }: IProps): JSX.Element {
	const { t } = useTranslation();

	const validationSchema = Yup.object().shape({
		level: Yup.number()
			.integer(t('forms:errors.required'))
			.required(t('forms:errors.required'))
			.min(1, t('forms:errors.min', { count: 1 }))
			.max(200, t('forms:errors.max', { count: 200 }))
			.typeError(t('forms:errors.invalidValue')),
		roleId: Yup.string()
			.required(t('forms:errors.required'))
			.oneOf(
				roles.map(role => role.id),
				t('forms:errors.invalid')
			),
		takePreviousRole: Yup.boolean(),
	});

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IAddReward>({
		defaultValues: {
			level: 0,
			roleId: '',
			takePreviousRole: false,
		},
		resolver: yupResolver(validationSchema),
	});

	const handleAdd: SubmitHandler<IAddReward> = ({ level, roleId, takePreviousRole }) => {
		setOpen(false);
		addRole({ level, roleId, takePreviousRole });
		reset();
	};

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			PaperProps={{
				elevation: 0,
				sx: {
					backgroundColor: theme => theme.colors.background.lighter,
				},
			}}
		>
			<DialogTitle>{t('levelsPage:addReward')}</DialogTitle>
			<DialogContent>
				<TextField
					margin='dense'
					label={t('common:level')}
					type='number'
					{...register('level')}
					error={!!errors.level}
					helperText={errors.level?.message}
				/>
				<Controller
					control={control}
					name='roleId'
					render={({ field, fieldState }) => (
						<RoleSelect
							roles={roles}
							value={field.value}
							onChange={roleId => field.onChange(roleId)}
							error={fieldState.invalid}
							helperText={fieldState.error?.message}
							disableClearable
						/>
					)}
				/>
				<FormControlLabel
					control={<Checkbox {...register('takePreviousRole')} />}
					label={t('levelsPage:takePreviousReward').toString()}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)} variant='outlined'>
					{t('common:cancel')}
				</Button>
				<Button onClick={handleSubmit(handleAdd)} variant='contained'>
					{t('common:add')}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
