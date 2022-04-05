import { ReactNode } from 'react';

import { ListItemIcon, ListItemText, MenuItem, styled } from '@mui/material';

import Link from '@components/Link';

interface IProps {
	href: string;
	label: string;
	icon: ReactNode;
	error?: boolean;
}

const StyledItem = styled(MenuItem)(({ theme }) => ({
	padding: 0,
	'&:hover': {
		backgroundColor: theme.colors.background.lighter,
	},
}));

const StyledLink = styled(Link)({
	display: 'flex',
	padding: '.5rem 1.25rem',
	textDecoration: 'none',
});

export default function ProfileMenuItem({ href, label, icon, error = false }: IProps): JSX.Element {
	return (
		<StyledItem tabIndex={0}>
			<StyledLink href={href} noLinkStyle>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText sx={{ color: theme => (error ? theme.palette.error.main : 'inherit') }}>{label}</ListItemText>
			</StyledLink>
		</StyledItem>
	);
}
