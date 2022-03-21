import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import DashboardCard from '@components/DashboardCard';
import DurationPicker from '@components/DurationPicker';

import useIsDesktop from '@hooks/useIsDesktop';

import type { AutoRole, Role } from 'types';

interface IProps {
	roles: Role[];
	autoRoles: AutoRole[];
	onSubmit: (roleId: string, duration: number) => void;
}

export default function AddAutoRole({ roles, autoRoles, onSubmit }: IProps): JSX.Element {
	const isDesktop = useIsDesktop();
	const { t } = useTranslation();

	const [duration, setDuration] = useState(0);
	const [selectedRoleId, setSelectedRoleId] = useState('');
	const selectedRole = roles.find(role => role.id === selectedRoleId);
	const isLimit = autoRoles.length >= 5;

	const [values, setValues] = useState({
		days: '0',
		hours: '0',
		minutes: '0',
		seconds: '0',
	});

	const handleDurationChange = (dur: number) => {
		setDuration(dur);
	};

	const handleSubmit = (roleId: string, duration: number) => {
		onSubmit(roleId, duration);
		setSelectedRoleId('');
		setValues({ days: '0', hours: '0', minutes: '0', seconds: '0' });
		setDuration(0);
	};

	const selectRoleLabel = t('dashboardPage:autoRoles.selectRole');

	return (
		<DashboardCard header={t('dashboardPage:autoRoles.addAutoRoleHeader')}>
			<FormControl fullWidth sx={{ marginBlock: '1rem' }} size={isDesktop ? 'medium' : 'small'}>
				<InputLabel id='selectRoleLabel'>{selectRoleLabel}</InputLabel>
				<Select
					labelId='selectRoleLabel'
					label={selectRoleLabel}
					value={selectedRoleId}
					onChange={e => setSelectedRoleId(e.target.value)}
					sx={{
						color: selectedRole ? `#${selectedRole.color ? selectedRole.color.toString(16) : '99AAB5'}` : '#fff',
					}}
				>
					{roles
						.filter(role => !autoRoles.find(autoRole => autoRole.roleId === role.id))
						.sort((a, b) => b.position - a.position)
						.map(role => (
							<MenuItem
								key={role.id}
								value={role.id}
								sx={{ color: `#${role.color ? role.color.toString(16) : '99AAB5'}` }}
								dense
							>
								{role.name}
							</MenuItem>
						))}
				</Select>
			</FormControl>
			<DurationPicker values={values} setValues={setValues} onChange={handleDurationChange} />
			<Button
				variant='contained'
				sx={{ marginTop: '1rem' }}
				disabled={!selectedRoleId || isLimit}
				onClick={() => handleSubmit(selectedRoleId, duration)}
			>
				{t('dashboardPage:autoRoles.addAutoRoleButton')}
			</Button>
		</DashboardCard>
	);
}
