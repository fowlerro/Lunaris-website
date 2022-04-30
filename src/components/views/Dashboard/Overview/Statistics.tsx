import { Divider, styled, Tooltip } from '@mui/material';

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
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import useIsDesktop from '@hooks/useIsDesktop';
import useTranslation from 'next-translate/useTranslation';

const Content = styled('div')({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'center',
	gap: '1rem',
});

const StyledCard = styled('div')(({ theme }) => ({
	backgroundColor: theme.colors.background.lighter,
	boxShadow: theme.shadows[4],
	borderRadius: theme.shape.borderRadius,
	padding: '1rem',
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
	fontWeight: theme.typography.fontWeightMedium,
	userSelect: 'none',
}));

export default function Statistics(): JSX.Element {
	const isDesktop = useIsDesktop();
	const { t } = useTranslation('dashboardPage');
	return (
		<>
			<Content>
				<Card icon={faUser} number={1024} tooltip={t('stats.members')} />
				<Card icon={faRobot} number={1} tooltip={t('stats.bots')} />
				<Card icon={faUserSlash} number={2} tooltip={t('stats.bans')} />
			</Content>
			<Divider orientation={isDesktop ? 'vertical' : 'horizontal'} flexItem variant='middle' />
			<Content>
				<Card icon={faHashtag} number={19} tooltip={t('stats.channels')} />
				<Card icon={faVolumeHigh} number={6} tooltip={t('stats.voiceChannels')} />
			</Content>
			<Divider orientation={isDesktop ? 'vertical' : 'horizontal'} flexItem variant='middle' />
			<Content>
				<Card icon={faAt} number={27} tooltip={t('stats.roles')} />
				<Card icon={faFaceGrinSquint} number={50} tooltip={t('stats.emojis')} />
			</Content>
		</>
	);
}

interface CardProps {
	icon: IconProp;
	number: number;
	tooltip: string;
}

function Card({ icon, number, tooltip }: CardProps) {
	return (
		<Tooltip title={tooltip}>
			<StyledCard>
				<Icon icon={icon} /> {number}
			</StyledCard>
		</Tooltip>
	);
}
