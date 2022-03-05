import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Button, Menu, styled } from '@mui/material';

import Link from '@components/Link';
import Avatar from '@components/Avatar';
import UserMenuItems from './UserMenuItems';
// import { LinkItem } from './Links';
import useUser from '@hooks/useUser';
import { User } from 'types';
import useIsDesktop from '@hooks/useIsDesktop';

export const loginURL = `${process.env.apiDomain}/api/auth/discord`;

const StyledButton = styled(Button)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	cursor: 'pointer',
	padding: '.5rem',
	borderRadius: '50%',
	color: theme.colors.text.primary,
	textTransform: 'none',
	fontSize: '1rem',

	'&:hover, &:focus': {
		background: theme.colors.background.lighter,
	},

	[theme.breakpoints.up('lg')]: {
		padding: '.5rem 1rem',
		borderRadius: '.75rem',
	},
}));

const AvatarBox = styled(Box)({
	display: 'flex',
	position: 'relative',
	verticalAlign: 'middle',
	width: '2.5rem',
	height: '2.5rem',
});

const Nickname = styled('span')(({ theme }) => ({
	fontFamily: 'Roboto',
	fontWeight: 500,
	display: 'none',
	marginLeft: '.5rem',

	[theme.breakpoints.up('lg')]: {
		display: 'inline',
	},
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
	'& .MuiMenu-paper': {
		marginTop: '.8rem',
		overflow: 'visible',
		backgroundColor: theme.colors.background.input,
		color: theme.colors.text.primary,
		borderRadius: '8px',

		'& .MuiAvatar-root': {
			width: 32,
			height: 32,
			ml: -0.5,
			mr: 1,
		},
		'&::before': {
			content: '""',
			display: 'block',
			position: 'absolute',
			top: 0,
			right: 25,
			width: 10,
			height: 10,
			backgroundColor: theme.colors.background.input,
			transform: 'translateY(-50%) rotate(45deg)',
			zIndex: 0,

			[theme.breakpoints.up('lg')]: {
				right: '50%',
				transform: 'translate(50%, -50%) rotate(45deg)',
			},
		},
	},

	'& .MuiMenu-list': {
		width: '100%',
	},
}));

export default function UserMenu(): JSX.Element {
	const user = useUser({});
	const { t } = useTranslation();

	return user ? (
		<Profile user={user} />
	) : (
		<Link href={loginURL} noLinkStyle underline='none' tabIndex={0}>
			{t('common:login')}
		</Link>
	);
}

function Profile({ user }: { user: User }) {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);
	const isDesktop = useIsDesktop();
	const horizontalOrigin = isDesktop ? 'center' : 'right';

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<StyledButton
				disableFocusRipple
				onClick={handleOpen}
				aria-haspopup='true'
				aria-expanded={open}
				aria-controls={'profileMenu'}
				aria-label={user.discordTag}
			>
				<ProfileAvatar user={user} />
				<Nickname>{user.discordTag}</Nickname>
			</StyledButton>
			<StyledMenu
				variant='menu'
				anchorEl={anchorEl}
				id='profileMenu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				anchorOrigin={{ horizontal: horizontalOrigin, vertical: 'bottom' }}
				transformOrigin={{ horizontal: horizontalOrigin, vertical: 'top' }}
			>
				<UserMenuItems user={user} />
			</StyledMenu>
		</>
	);
}

function ProfileAvatar({ user }: { user: User }) {
	return (
		<AvatarBox>
			<Avatar
				src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.webp`}
				alt='Avatar'
				layout='fill'
			/>
		</AvatarBox>
	);
}
