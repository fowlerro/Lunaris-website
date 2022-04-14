import useTranslation from 'next-translate/useTranslation';

import { Box, LinearProgress, linearProgressClasses, styled, Tooltip, Typography, Zoom } from '@mui/material';

import type { ProfileStatistics } from 'types';
import Skeleton from '@components/Loading/Skeleton';

interface IProps {
	type: 'text' | 'voice';
	statistics: ProfileStatistics['text'] | undefined;
	xpNeeded: number | undefined;
	rank: number | undefined;
}

const Container = styled('div')({
	width: '100%',
	marginBlock: '1rem',
});

const Section = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
});

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
	width: '100%',
	height: '1rem',
	borderRadius: '1rem',
	marginBlock: '.2rem',

	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.colors.background.lighter,
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: '1rem',
		backgroundColor: theme.colors.primary.main,
	},
}));

export default function ProfileStats({ type, statistics, xpNeeded, rank }: IProps): JSX.Element {
	const { t } = useTranslation('profilePage');
	const xpPercentage = statistics && xpNeeded ? (statistics.xp / xpNeeded) * 100 : 0;

	const XpNeeded = statistics ? `${statistics.xp}/${xpNeeded}` : <Skeleton variant='text' width='7ch' align='center' />;

	const Level = statistics ? `${statistics.level} ${t('level')}` : <Skeleton variant='text' width='10ch' />;
	const Rank = rank ? `#${rank}` : <Skeleton variant='text' width='4ch' />;
	const DailyXP = statistics ? (
		`${statistics.dailyXp}\n${t('today')}`
	) : (
		<>
			<Skeleton variant='text' width='5ch' />
			<Skeleton variant='text' width='7ch' />
		</>
	);
	const TotalXP = statistics ? (
		`${statistics.totalXp}\n${t('total')}`
	) : (
		<>
			<Skeleton variant='text' width='5ch' align='right' />
			<Skeleton variant='text' width='7ch' align='right' />
		</>
	);

	return (
		<Container>
			<Typography variant='h3' component='h2' sx={{ textTransform: 'capitalize', marginBottom: '1rem' }}>
				{t(type)}
			</Typography>
			<Section sx={{ marginInline: '.2rem' }}>
				<Typography variant='subtitle2' sx={{ textAlign: 'left', textTransform: 'uppercase' }}>
					{Level}
				</Typography>
				<Typography variant='subtitle2' sx={{ textAlign: 'right' }}>
					{Rank}
				</Typography>
			</Section>
			<Section>
				<Tooltip title={`${xpPercentage.toFixed()}%`} placement={'top'} arrow describeChild TransitionComponent={Zoom}>
					<ProgressBar variant='determinate' value={xpPercentage} tabIndex={0} />
				</Tooltip>
			</Section>
			<Section sx={{ marginInline: '.2rem' }}>
				<Typography
					variant='caption'
					sx={{ whiteSpace: 'pre-line', textAlign: 'left', textTransform: 'uppercase', flex: '1' }}
				>
					{DailyXP}
				</Typography>
				<Typography variant='caption' sx={{ flex: '1' }}>
					{XpNeeded}
				</Typography>
				<Typography
					variant='caption'
					sx={{ whiteSpace: 'pre-line', textAlign: 'right', textTransform: 'uppercase', flex: '1' }}
				>
					{TotalXP}
				</Typography>
			</Section>
		</Container>
	);
}
