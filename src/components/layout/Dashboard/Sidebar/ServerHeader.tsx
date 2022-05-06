import { useRouter } from 'next/router';
import useSWR from 'swr';

import { Box, Typography } from '@mui/material';

import ServerIcon from '@components/ServerIcon';
import Skeleton from '@components/Loading/Skeleton';

import { fetcher } from '@utils/utils';

import type { GuildInfo } from 'types';

interface IconProps {
	id: string | undefined;
	name: string | undefined;
	icon: string | null | undefined;
	nameAcronym: string | undefined;
}

interface NameProps {
	name: string | undefined;
}

export default function ServerHeader(): JSX.Element {
	const router = useRouter();
	const guildId = router.query.guildId as string;

	const { data: guildInfo } = useSWR<GuildInfo>(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}`, fetcher);

	return (
		<Box display='flex' alignItems='center' padding='1rem'>
			<Box sx={{ width: '3rem', height: '3rem', marginRight: '1rem' }}>
				<Icon id={guildId} name={guildInfo?.name} icon={guildInfo?.icon} nameAcronym={guildInfo?.acronym} />
			</Box>
			<Typography variant='h5' sx={{ fontWeight: theme => theme.typography.fontWeightMedium }}>
				<Name name={guildInfo?.name} />
			</Typography>
		</Box>
	);
}

function Icon({ id, name, icon, nameAcronym }: IconProps): JSX.Element {
	return id && name && nameAcronym ? (
		<ServerIcon id={id} icon={icon ?? null} name={name} nameAcronym={nameAcronym} />
	) : (
		<Skeleton variant='circular' />
	);
}

function Name({ name }: NameProps): JSX.Element {
	return name ? <>{name}</> : <Skeleton variant='text' width='8ch' />;
}
