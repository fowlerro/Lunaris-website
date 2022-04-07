import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Control, Controller, SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';

import { Button } from '@mui/material';

import DashboardCard from '@components/DashboardCard';
import DurationPicker from '@components/DurationPicker';
import RoleSelect from '@components/Inputs/RoleSelect';

import useIsDesktop from '@hooks/useIsDesktop';

import type { AutoRole, AutoRolePageData, Role } from 'types';

interface IProps {
	roles: Role[];
	control: Control<AutoRolePageData>;
}

export default function AddAutoRole({ roles, control }: IProps): JSX.Element {
	const { t } = useTranslation();
	const isDesktop = useIsDesktop();

	const { append } = useFieldArray({
		name: 'autoRoles',
		control,
	});

	const { autoRoles } = useWatch({ control });

	const {
		control: addControl,
		watch,
		handleSubmit,
		reset,
	} = useForm<AutoRole>({
		defaultValues: {
			roleId: '',
			time: 0,
		},
	});

	const isLimit = (autoRoles?.length || 0) >= 5;

	const [values, setValues] = useState({
		days: '0',
		hours: '0',
		minutes: '0',
		seconds: '0',
	});

	const onSubmit: SubmitHandler<AutoRole> = async data => {
		append(data);
		setValues({ days: '0', hours: '0', minutes: '0', seconds: '0' });
		reset();
	};

	return (
		<DashboardCard header={t('autoRolesPage:addHeader')}>
			<Controller
				name='roleId'
				control={addControl}
				render={({ field, fieldState }) => (
					<RoleSelect
						size={isDesktop ? 'medium' : 'small'}
						disableClearable
						roles={roles}
						filterOptions={options => options.filter(role => !autoRoles?.some(autoRole => autoRole.roleId === role.id))}
						value={field.value}
						onChange={field.onChange}
						error={fieldState.invalid}
						helperText={fieldState.error?.message}
					/>
				)}
			/>
			<Controller
				name='time'
				control={addControl}
				render={({ field }) => <DurationPicker values={values} setValues={setValues} onChange={field.onChange} />}
			/>
			<Button
				variant='contained'
				sx={{ marginTop: '1rem' }}
				disabled={!watch('roleId') || isLimit}
				onClick={handleSubmit(onSubmit)}
			>
				{t('autoRolesPage:buttons.add')}
			</Button>
		</DashboardCard>
	);
}
