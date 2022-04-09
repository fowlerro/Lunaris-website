import { Paper, styled } from '@mui/material';

import useUser from '@hooks/useUser';
import { loginURL } from '@utils/constants';

import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';

import type { ProfileWithRank } from 'types';

interface IProps {
	profile: ProfileWithRank;
}

const StyledCard = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.colors.background.secondary,
	textAlign: 'center',
	maxWidth: '20rem',
	marginTop: '4rem',
	marginInline: 'auto',
	borderRadius: theme.shape.borderRadius,
	filter: 'drop-shadow(0 0 8px rgba(0,0,0,.5))',
}));

export default function ProfileCard({ profile }: IProps): JSX.Element {
	const user = useUser({ redirectTo: loginURL });
	if (!user) return <></>;
	return (
		<StyledCard elevation={0}>
			<ProfileHeader user={user} />
			<ProfileContent statistics={profile.statistics} xpNeeded={profile.xpNeeded} rank={profile.rank} />
		</StyledCard>
	);
}
