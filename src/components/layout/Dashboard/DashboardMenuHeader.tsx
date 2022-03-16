import { useRouter } from 'next/router';
import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { Box, Skeleton, styled } from '@mui/material';

import ServerName from './ServerName';
import ServerStats from './ServerStats';

import { fetcher } from '@utils/utils';
import type { GuildStats } from 'types';

const Container = styled('div')({
	textAlign: 'center',
});

export default function DashboardMenuHeader(): JSX.Element {
	const router = useRouter();
	const guildId = router.query?.guildId?.toString();
	const { data, error } = useSWR<AxiosResponse<GuildStats>>(`${process.env.API_URL}/guilds/${guildId}/stats`, fetcher);
	const guildStats = data?.data;

	if (error || !guildId) return <div>Failed to load</div>;
	if (!guildStats) return <Loading />;

	return (
		<Container>
			<ServerName guildId={guildId} name={guildStats.name} icon={guildStats.icon} />
			<ServerStats stats={guildStats.stats} />
		</Container>
	);
}

function Loading(): JSX.Element {
	return (
		<Container>
			<Skeleton variant='circular' width='4rem' height='4rem' sx={{ marginInline: 'auto' }} />
			<Skeleton height='2rem' width='60%' sx={{ marginInline: 'auto' }} />
			<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '.5rem', margin: '1rem' }}>
				<SkeletonItem />
				<SkeletonItem />
				<SkeletonItem />
				<SkeletonItem />
			</Box>
		</Container>
	);
}

function SkeletonItem(): JSX.Element {
	return (
		<div>
			<Skeleton width='75%' sx={{ marginInline: 'auto' }} />
			<Skeleton width='20%' sx={{ marginInline: 'auto' }} />
		</div>
	);
}
