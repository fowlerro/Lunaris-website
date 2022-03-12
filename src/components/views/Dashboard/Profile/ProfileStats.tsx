import {
	Box,
	LinearProgress,
	linearProgressClasses,
	styled,
	Tooltip,
	tooltipClasses,
	TooltipProps,
	Typography,
	Zoom,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { ProfileStatistics } from 'types';

interface IProps {
	type: 'text' | 'voice';
	statistics: ProfileStatistics['text'];
	xpNeeded: number;
	rank: number;
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
		borderRadius: 5,
		backgroundColor: theme.colors.primary.main,
	},
}));

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.colors.background.input,
		boxShadow: theme.shadows[3],
	},

	[`& .${tooltipClasses.arrow}::before`]: {
		backgroundColor: theme.colors.background.input,
	},
}));

export default function ProfileStats({
	type,
	statistics: { level, xp, dailyXp, totalXp },
	xpNeeded,
	rank,
}: IProps): JSX.Element {
	const { t } = useTranslation('dashboardPage');
	const xpPercentage = (xp / xpNeeded) * 100;
	return (
		<Container>
			<Typography variant='h3' component='h2' sx={{ textTransform: 'capitalize', marginBottom: '1rem' }}>
				{t(type)}
			</Typography>
			<Section sx={{ marginInline: '.2rem' }}>
				<Typography variant='subtitle2' sx={{ textAlign: 'left', textTransform: 'uppercase' }}>
					{`${level} ${t('level')}`}
				</Typography>
				<Typography variant='subtitle2' sx={{ textAlign: 'right' }}>
					{`#${rank}`}
				</Typography>
			</Section>
			<Section>
				<StyledTooltip
					title={`${xpPercentage.toFixed()}%`}
					placement={'top'}
					arrow
					describeChild
					TransitionComponent={Zoom}
				>
					<ProgressBar variant='determinate' value={xpPercentage} tabIndex={0} />
				</StyledTooltip>
			</Section>
			<Section sx={{ marginInline: '.2rem' }}>
				<Typography
					variant='caption'
					sx={{ whiteSpace: 'pre-line', textAlign: 'left', textTransform: 'uppercase', flex: '1' }}
				>{`${dailyXp}\n${t('today')}`}</Typography>
				<Typography variant='caption' sx={{ flex: '1' }}>{`${xp}/${xpNeeded}`}</Typography>
				<Typography
					variant='caption'
					sx={{ whiteSpace: 'pre-line', textAlign: 'right', textTransform: 'uppercase', flex: '1' }}
				>{`${totalXp}\n${t('total')}`}</Typography>
			</Section>
		</Container>
	);
}
