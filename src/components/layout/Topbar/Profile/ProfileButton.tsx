import React, { ReactNode } from 'react';

import { Button, styled } from '@mui/material';

interface IProps {
	open: boolean;
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	userTag: string;
	children: ReactNode;
}

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
		background: theme.colors.background.input,
	},

	[theme.breakpoints.up('lg')]: {
		padding: '.5rem 1rem',
		borderRadius: '.75rem',
	},
}));

export default function ProfileButton({ open, onClick, userTag, children }: IProps): JSX.Element {
	return (
		<StyledButton
			disableFocusRipple
			onClick={onClick}
			aria-haspopup='true'
			aria-expanded={open}
			aria-controls={'profileMenu'}
			aria-label={userTag}
		>
			{children}
		</StyledButton>
	);
}
