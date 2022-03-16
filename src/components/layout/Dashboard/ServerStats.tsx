import { styled, Typography, TypographyProps } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { GuildStats } from 'types';

interface IProps {
	stats: GuildStats['stats'];
}

const Container = styled('div')({
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: '.5rem',
	margin: '1rem',
});

const Header = styled((props: TypographyProps) => {
	return <Typography variant='subtitle2' {...props} />;
})(({ theme }) => ({
	color: theme.colors.text.muted,
}));

const Value = styled((props: TypographyProps) => {
	return <Typography variant='subtitle2' {...props} />;
})(({ theme }) => ({
	color: theme.colors.text.primary,
	fontWeight: 400,
}));

export default function ServerStats({ stats }: IProps): JSX.Element {
	const { t } = useTranslation('dashboardPage');
	return (
		<Container>
			<div>
				<Header>{t('stats.members')}</Header>
				<Value>{stats.members}</Value>
			</div>
			<div>
				<Header>{t('stats.channels')}</Header>
				<Value>{stats.channels}</Value>
			</div>
			<div>
				<Header>{t('stats.bots')}</Header>
				<Value>{stats.bots}</Value>
			</div>
			<div>
				<Header>{t('stats.voiceChannels')}</Header>
				<Value>{stats.voiceChannels}</Value>
			</div>
		</Container>
	);
}
