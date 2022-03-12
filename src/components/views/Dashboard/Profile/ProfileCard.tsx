import { Paper, styled } from '@mui/material';
import ProfileHeader from './ProfileHeader';
import useUser from '@hooks/useUser';
import type { ProfileWithRank } from 'types';
import ProfileContent from './ProfileContent';

interface IProps {
	profile: ProfileWithRank;
}

const StyledCard = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.colors.background.secondary,
	textAlign: 'center',
	maxWidth: '20rem',
	marginTop: '4rem',
	marginInline: 'auto',
	borderRadius: '12px',
	filter: 'drop-shadow(0 0 8px rgba(0,0,0,.5))',
}));

export default function ProfileCard({ profile }: IProps): JSX.Element {
	const user = useUser({ redirectTo: '/' });

	if (!user) return <></>;

	return (
		<StyledCard elevation={0}>
			<ProfileHeader discordId={user.discordId} discordTag={user.discordTag} avatar={user.avatar} />
			<ProfileContent statistics={profile.statistics} xpNeeded={profile.xpNeeded} rank={profile.rank} />
		</StyledCard>
	);
}
