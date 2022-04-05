import { ProfileAvatar } from '@components/layout/Topbar/Profile/ProfileAvatar';
import { ProfileUsername } from '@components/layout/Topbar/Profile/ProfileUsername';
import Link from '@components/Link';
import useUser from '@hooks/useUser';

export default function Profile(): JSX.Element {
	const user = useUser({ redirectTo: '/login' });
	if (!user) return <></>;

	return (
		<Link
			href='/dashboard'
			sx={{
				textDecoration: 'none',
				color: theme => theme.colors.text.primary,
				display: 'flex',
				alignItems: 'center',
				borderRadius: theme => theme.shape.borderRadius,
				padding: '.25rem .5rem',

				'&:hover, &:focus': {
					backgroundColor: theme => theme.colors.background.input,
				},
			}}
		>
			<ProfileAvatar userId={user.discordId} avatarHash={user.avatar} />
			<ProfileUsername username={user.discordTag} />
		</Link>
	);
}
