import { Menu, styled } from '@mui/material';

import useIsDesktop from '@hooks/useIsDesktop';

interface IProps {
	anchorEl: HTMLButtonElement | null;
	open: boolean;
	onClose: () => void;
	children: JSX.Element | JSX.Element[];
}

const StyledMenu = styled(Menu)(({ theme }) => ({
	'& .MuiMenu-paper': {
		marginTop: '.8rem',
		overflow: 'visible',
		backgroundColor: theme.colors.background.input,
		color: theme.colors.text.primary,
		borderRadius: '8px',
		boxShadow: theme.shadows[6],

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

export default function ProfileMenu({ anchorEl, open, onClose, children }: IProps): JSX.Element {
	const isDesktop = useIsDesktop();
	const horizontalOrigin = isDesktop ? 'center' : 'right';

	return (
		<StyledMenu
			variant='menu'
			anchorEl={anchorEl}
			elevation={0}
			id='profileMenu'
			open={open}
			onClose={onClose}
			onClick={onClose}
			anchorOrigin={{ horizontal: horizontalOrigin, vertical: 'bottom' }}
			transformOrigin={{ horizontal: horizontalOrigin, vertical: 'top' }}
		>
			{children}
		</StyledMenu>
	);
}
