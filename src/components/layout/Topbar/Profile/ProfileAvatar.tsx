import { styled } from '@mui/material';

import Avatar from '@components/Avatar';
import { getUserAvatar } from '@utils/utils';

const AvatarBox = styled('div')({
	display: 'flex',
	position: 'relative',
	verticalAlign: 'middle',
	width: '2.5rem',
	height: '2.5rem',
});

interface ProfileAvatarProps {
	userId: string;
	avatarHash: string | null;
}

export function ProfileAvatar({ userId, avatarHash }: ProfileAvatarProps): JSX.Element {
	const avatarURL = getUserAvatar(userId, avatarHash);

	return (
		<AvatarBox>
			<Avatar src={avatarURL} alt='Avatar' layout='fill' />
		</AvatarBox>
	);
}
