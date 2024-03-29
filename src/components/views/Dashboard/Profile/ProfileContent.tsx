import { Paper, styled } from '@mui/material';

import ProfileStats from './ProfileStats';

import type { ProfileStatistics, ProfileWithRank } from 'types';

interface IProps {
	statistics: ProfileStatistics | undefined;
	xpNeeded: ProfileWithRank['xpNeeded'] | undefined;
	rank: ProfileWithRank['rank'] | undefined;
}

const CardContent = styled(Paper)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	backgroundColor: theme.colors.background.secondary,
	borderRadius: theme.shape.borderRadius,
	padding: '2rem 1rem',
}));

export default function ProfileContent({ statistics, xpNeeded, rank }: IProps): JSX.Element {
	return (
		<CardContent elevation={0}>
			<ProfileStats type='text' statistics={statistics?.text} xpNeeded={xpNeeded?.text} rank={rank?.text} />
			<ProfileStats type='voice' statistics={statistics?.voice} xpNeeded={xpNeeded?.voice} rank={rank?.voice} />
		</CardContent>
	);
}
