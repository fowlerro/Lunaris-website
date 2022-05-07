import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';
import { Control } from 'react-hook-form';

import { Typography } from '@mui/material';

import DashboardCard from '@components/DashboardCard';

import useGuildId from '@hooks/useGuildId';
import { fetcher } from '@utils/utils';

import LevelRewardsTable from './LevelRewardsTable';

import type { LevelConfigPageData, Role } from 'types';

interface IProps {
	control: Control<LevelConfigPageData>;
}

export default function LevelRewardsCard({ control }: IProps): JSX.Element {
	const { t } = useTranslation();
	const guildId = useGuildId();

	const { data: roles } = useSWR<Role[]>(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/roles`, fetcher);

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
