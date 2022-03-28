import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'next-i18next';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
	Autocomplete,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	TextField,
} from '@mui/material';

import { getRoleColor } from '@utils/utils';

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
		getValues,
		reset,
		formState: { errors: addErrors },
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
			<DialogTitle>Add reward</DialogTitle>
			<DialogContent>
				<TextField
					margin='dense'
					label='Level'
					type='number'
					{...register('level')}
					error={!!addErrors.level}
					helperText={addErrors.level?.message}
				/>
				<Controller
					control={control}
					name='roleId'
					render={({ field }) => (
						<Autocomplete
							options={roles.map(role => ({ label: role.name, id: role.id }))}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							sx={{
								textTransform: 'none',
								['& .MuiAutocomplete-inputRoot']: {
									color: getRoleColor(roles.find(role => role.id === getValues().roleId)?.color || 0),
								},
							}}
							ListboxProps={{
								style: { textTransform: 'none' },
							}}
							disableClearable
							renderOption={(props, { label, id }) => (
								<li style={{ color: getRoleColor(roles.find(role => role.id === id)?.color || 0) }} {...props} key={id}>
									{label}
								</li>
							)}
							renderInput={params => (
								<TextField
									{...params}
									margin='dense'
									label={t('common:role')}
									error={!!addErrors?.roleId}
									helperText={addErrors?.roleId?.message}
								/>
							)}
							// eslint-disable-next-line react/prop-types
							onChange={(_, data) => field.onChange(data?.id || '')}
						/>
					)}
				/>
				<FormControlLabel control={<Checkbox {...register('takePreviousRole')} />} label='Take previous reward?' />
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)} variant='outlined'>
					Cancel
				</Button>
				<Button onClick={handleSubmit(handleAdd)} variant='contained'>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
}
