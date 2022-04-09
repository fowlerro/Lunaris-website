import { Box, Paper, styled, Typography } from '@mui/material';

import Avatar from '@components/Avatar';

import { getUserAvatar, getUserBanner } from '@utils/utils';

import type { User } from 'types';

interface IProps {
	user: User;
}

const CardHeader = styled(Paper)(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	backgroundColor: theme.colors.background.secondary,
	borderRadius: theme.shape.borderRadius,
	boxShadow: theme.shadows[4],
	paddingBlock: '2rem',
	zIndex: 0,
}));

const Banner = styled('div')(({ theme }) => ({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	backgroundColor: theme.colors.background.secondary,
	borderRadius: theme.shape.borderRadius,
	zIndex: -1,
	overflow: 'hidden',
	'&::before': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		filter: 'blur(2px)',
	},
}));

const AvatarWrapper = styled(Box)({
	position: 'absolute',
	transform: 'translateY(calc(-50% - 2rem))',
	width: '5rem',
	height: '5rem',
	filter: 'drop-shadow(0 0 8px rgba(0,0,0,1))',
});

export default function ProfileHeader({ user }: IProps): JSX.Element {
	const avatarURL = getUserAvatar(user.discordId, user.avatar);
	const bannerURL = getUserBanner(user.discordId, user.banner);

	return (
		<CardHeader elevation={0}>
			<Banner sx={{ '&::before': { backgroundImage: bannerURL ? `url(${bannerURL})` : 'unset' } }}></Banner>
			<AvatarWrapper>
				<Avatar src={avatarURL} alt='Avatar' layout='fill' />
			</AvatarWrapper>
			<Typography variant='h3' component='h1' sx={{ marginTop: '2rem', textShadow: '2px 2px 4px #000' }}>
				{user.discordTag}
			</Typography>
		</CardHeader>
	);
}
