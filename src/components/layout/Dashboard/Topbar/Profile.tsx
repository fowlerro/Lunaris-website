import { styled } from '@mui/material';

import { ProfileAvatar } from '@components/layout/Topbar/Profile/ProfileAvatar';
import { ProfileUsername } from '@components/layout/Topbar/Profile/ProfileUsername';
import Link from '@components/Link';
import useUser from '@hooks/useUser';

const StyledLink = styled(Link)(({ theme }) => ({
	textDecoration: 'none',
	color: theme.colors.text.primary,
	display: 'flex',
	alignItems: 'center',
	borderRadius: theme.shape.borderRadius,
	padding: '.25rem .5rem',

	'&:hover, &:focus': {
		backgroundColor: theme.colors.background.input,
	},
}));

export default function Profile(): JSX.Element {
	const user = useUser({ redirectTo: '/login' });
	if (!user) return <></>;

	return (
		<StyledLink href='/dashboard'>
			<ProfileAvatar userId={user.discordId} avatarHash={user.avatar} />
			<ProfileUsername username={user.discordTag} />
		</StyledLink>
	);
}
