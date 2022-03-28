import { Control } from 'react-hook-form';

import { Typography } from '@mui/material';

import DashboardCard from '@components/DashboardCard';

import type { LevelConfigPageData, Role } from 'types';
import LevelRewardsTable from './LevelRewardsTable';
import { useTranslation } from 'next-i18next';

interface IProps {
	roles: Role[];
	control: Control<LevelConfigPageData>;
}

export default function LevelRewardsCard({ roles, control }: IProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<DashboardCard header={t('dashboardPage:levels.levelRewardsHeader')} initialExpand>
			<Typography variant='h5' gutterBottom sx={{ marginTop: '1rem' }}>
				{t('dashboardPage:levels.textRewardsHeader')}
			</Typography>
			<LevelRewardsTable control={control} roles={roles} />
			<Typography variant='h5' gutterBottom sx={{ marginTop: '3rem' }}>
				{t('dashboardPage:levels.voiceRewardsHeader')}
			</Typography>
			<LevelRewardsTable control={control} roles={roles} voice />
		</DashboardCard>
	);
}
