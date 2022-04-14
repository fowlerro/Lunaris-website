import { useRouter } from 'next/router';
import useSWR from 'swr';

import { Box, Typography } from '@mui/material';

import ServerIcon from '@components/ServerIcon';
import Skeleton from '@components/Loading/Skeleton';

import { fetcher } from '@utils/utils';

import type { GuildStats } from 'types';

interface IconProps {
	id: string | undefined;
	name: string | undefined;
	icon: string | null | undefined;
	acronym: string | undefined;
}

interface NameProps {
	name: string | undefined;
}

export default function ServerHeader(): JSX.Element {
	const router = useRouter();
	const guildId = router.query.guildId as string;

	const { data: guildStats } = useSWR<GuildStats>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/stats`,
		fetcher
	);

	return (
		<Box display='flex' alignItems='center' padding='1rem'>
			<Box sx={{ width: '3rem', height: '3rem', marginRight: '1rem' }}>
				<Icon id={guildId} name={guildStats?.name} icon={guildStats?.icon?.hash} acronym={guildStats?.icon?.acronym} />
			</Box>
			<Typography variant='h5' sx={{ fontWeight: theme => theme.typography.fontWeightMedium }}>
				<Name name={guildStats?.name} />
			</Typography>
		</Box>
	);
}

function Icon({ id, name, icon, acronym }: IconProps): JSX.Element {
	return id && name && acronym ? (
		<ServerIcon id={id} name={name} icon={icon ?? null} acronym={acronym} />
	) : (
		<Skeleton variant='circular' />
	);
}

function Name({ name }: NameProps): JSX.Element {
	return name ? <>{name}</> : <Skeleton variant='text' width='8ch' />;
}
