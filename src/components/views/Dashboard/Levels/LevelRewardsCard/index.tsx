import { useTranslation } from 'next-i18next';
import { Control } from 'react-hook-form';

import { Typography } from '@mui/material';

import DashboardCard from '@components/DashboardCard';
import LevelRewardsTable from './LevelRewardsTable';

import type { LevelConfigPageData, Role } from '@types';

interface IProps {
	roles: Role[];
	control: Control<LevelConfigPageData>;
}

export default function LevelRewardsCard({ roles, control }: IProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<DashboardCard header={t('levelsPage:levelRewardsHeader')}>
			<Typography variant='h5' gutterBottom sx={{ marginTop: '1rem' }}>
				{t('levelsPage:textRewardsHeader')}
			</Typography>
			<LevelRewardsTable control={control} roles={roles} />
			<Typography variant='h5' gutterBottom sx={{ marginTop: '3rem' }}>
				{t('levelsPage:voiceRewardsHeader')}
			</Typography>
			<LevelRewardsTable control={control} roles={roles} voice />
		</DashboardCard>
	);
}
