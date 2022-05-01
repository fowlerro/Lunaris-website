import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';

import { Divider, styled, Tooltip, Typography } from '@mui/material';

import {
	faAt,
	faFaceGrinSquint,
	faHashtag,
	faRobot,
	faUser,
	faUserSlash,
	faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';
import useIsDesktop from '@hooks/useIsDesktop';
import useGuildId from '@hooks/useGuildId';
import { fetcher } from '@utils/utils';

import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { GuildStats } from 'types';

const Content = styled('div')({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'center',
	gap: '1rem',
});

const StyledCard = styled('div')(({ theme }) => ({
	backgroundColor: theme.colors.background.lighter,
	boxShadow: theme.shadows[1],
	borderRadius: theme.shape.borderRadius,
	padding: '1rem',
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
	userSelect: 'none',
	transitionProperty: 'background-color, box-shadow',
	transitionDuration: '.5s',

	'&:hover': {
		backgroundColor: theme.colors.background.input,
		boxShadow: theme.shadows[4],
	},
}));

export default function Statistics(): JSX.Element {
	const isDesktop = useIsDesktop();
	const guildId = useGuildId();
	const { t } = useTranslation('dashboardPage');

	const { data: guildStats } = useSWR<GuildStats>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/stats`,
		fetcher
	);

	return (
		<>
			<Content>
				<Card icon={faUser} number={guildStats?.members} tooltip={t('stats.members')} />
				<Card icon={faRobot} number={guildStats?.bots} tooltip={t('stats.bots')} />
				<Card icon={faUserSlash} number={guildStats?.bans} tooltip={t('stats.bans')} />
			</Content>
			<Divider orientation={isDesktop ? 'vertical' : 'horizontal'} flexItem variant='middle' />
			<Content>
				<Card icon={faHashtag} number={guildStats?.channels} tooltip={t('stats.channels')} />
				<Card icon={faVolumeHigh} number={guildStats?.voiceChannels} tooltip={t('stats.voiceChannels')} />
			</Content>
			<Divider orientation={isDesktop ? 'vertical' : 'horizontal'} flexItem variant='middle' />
			<Content>
				<Card icon={faAt} number={guildStats?.roles} tooltip={t('stats.roles')} />
				<Card icon={faFaceGrinSquint} number={guildStats?.emojis} tooltip={t('stats.emojis')} />
			</Content>
		</>
	);
}

interface CardProps {
	icon: IconProp;
	number: number | undefined;
	tooltip: string;
}

function Card({ icon, number, tooltip }: CardProps) {
	return (
		<Tooltip title={tooltip} placement='bottom'>
			<StyledCard>
				<Icon icon={icon} />
				<Typography variant='subtitle2'>{number !== undefined ? number : 0}</Typography>
			</StyledCard>
		</Tooltip>
	);
}
