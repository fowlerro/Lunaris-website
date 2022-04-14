import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';
import { AxiosResponse } from 'axios';

import { Button, styled } from '@mui/material';

import Avatar from '@components/Avatar';
import ServerAcronymIcon from '@components/ServerAcronymIcon';
import Link from '@components/Link';

import useLastManagedServer from '@hooks/useLastManagedServer';
import { fetcher } from '@utils/utils';

import type { GuildInfo } from 'types';

const Section = styled('section')({
	padding: '1rem',
	textAlign: 'center',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

const IconWrapper = styled('div')({
	position: 'relative',
	width: '1.5rem',
	height: '1.5rem',
});

export default function ServerListSection(): JSX.Element {
	const { t } = useTranslation('profilePage');
	const lastManagedGuildId = useLastManagedServer();
	const { data } = useSWR<AxiosResponse<GuildInfo>>(
		lastManagedGuildId ? `${process.env.NEXT_PUBLIC_API_URL}/guilds/${lastManagedGuildId}` : null,
		fetcher
	);
	const guildInfo = data?.data;
	return (
		<Section>
			{lastManagedGuildId && guildInfo && guildInfo.name && guildInfo.acronym && (
				<Button
					LinkComponent={Link}
					href={`/dashboard/${lastManagedGuildId}`}
					variant='outlined'
					sx={{
						display: 'flex',
						marginInline: 'auto',
						marginBlock: '1rem',
						alignItems: 'center',
						gap: '1rem',
					}}
				>
					<IconWrapper>
						{guildInfo.icon ? (
							<Avatar
								src={`https://cdn.discordapp.com/icons/${lastManagedGuildId}/${guildInfo.icon}.webp`}
								layout='fill'
							/>
						) : (
							<ServerAcronymIcon>{guildInfo.acronym}</ServerAcronymIcon>
						)}
					</IconWrapper>
					{guildInfo.name}
				</Button>
			)}
			<Button
				variant='outlined'
				LinkComponent={Link}
				href='/servers'
				sx={{ color: theme => theme.colors.text.primary }}
			>
				{t('serverList')}
			</Button>
		</Section>
	);
}
