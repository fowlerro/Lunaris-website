import { Box, Paper, styled, Typography } from '@mui/material';
import Avatar from '@components/Avatar';

interface IProps {
	discordId: string;
	discordTag: `${string}#${number}`;
	avatar: string | null;
}

const CardHeader = styled(Paper)(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	backgroundColor: theme.colors.background.secondary,
	borderRadius: '12px',
	boxShadow: theme.shadows[4],
	paddingBlock: '2rem',
}));

const AvatarWrapper = styled(Box)({
	position: 'absolute',
	transform: 'translateY(calc(-50% - 2rem))',
	width: '5rem',
	height: '5rem',
});

export default function ProfileHeader({ discordId, discordTag, avatar }: IProps): JSX.Element {
	const avatarURL = avatar
		? `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.webp`
		: `https://cdn.discordapp.com/embed/avatars/${parseInt(discordTag.substring(discordTag.length - 4)) % 5}.png`;

	return (
		<CardHeader elevation={0}>
			<AvatarWrapper>
				<Avatar src={avatarURL} alt='Avatar' layout='fill' />
			</AvatarWrapper>
			<Typography variant='h3' component='h1' sx={{ marginTop: '2rem' }}>
				{discordTag}
			</Typography>
		</CardHeader>
	);
}
