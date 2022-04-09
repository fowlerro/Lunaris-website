import { useRouter } from 'next/router';
import useSWR from 'swr';
import { AxiosResponse } from 'axios';

import { Box, Typography } from '@mui/material';

import ServerIcon from '@components/ServerIcon';

import { fetcher } from '@utils/utils';

import type { GuildStats } from '@types';

export default function ServerHeader(): JSX.Element {
	const router = useRouter();
	const guildId = router.query.guildId as string;

	const { data, error } = useSWR<AxiosResponse<GuildStats>>(`${process.env.API_URL}/guilds/${guildId}/stats`, fetcher);

	if (error) return <>Error</>;
	if (!data?.data) return <>Loading</>;
	return (
		<Box display='flex' alignItems='center' padding='1rem'>
			<Box sx={{ width: '3rem', height: '3rem', marginRight: '1rem' }}>
				<ServerIcon id={guildId} name={data.data.name} icon={data.data.icon.hash} acronym={data.data.icon.acronym} />
			</Box>
			<Typography variant='h5' sx={{ fontWeight: theme => theme.typography.fontWeightMedium }}>
				{data.data.name}
			</Typography>
		</Box>
	);
}
