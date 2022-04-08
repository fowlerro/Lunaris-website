import { useTranslation } from 'next-i18next';
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
	width: '2rem',
	height: '2rem',
});

export default function ServerListSection(): JSX.Element {
	const { t } = useTranslation('dashboardPage');
	const lastManagedGuildId = useLastManagedServer();
	const { data } = useSWR<AxiosResponse<GuildInfo>>(
		lastManagedGuildId ? `${process.env.API_URL}/guilds/${lastManagedGuildId}` : null,
		fetcher
	);
	const guildInfo = data?.data;
	return (
		<Section>
			{lastManagedGuildId && guildInfo && guildInfo.name && guildInfo.acronym && (
				<Link href={`/dashboard/${lastManagedGuildId}`} sx={{ textDecoration: 'none' }}>
					<Button
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
				</Link>
			)}
			<Button variant='outlined' href='/servers' sx={{ color: theme => theme.colors.text.primary }}>
				{t('serverList')}
			</Button>
		</Section>
	);
}
