import { styled } from '@mui/material';

interface ProfileUsernameProps {
	username: string;
}

const Nickname = styled('span')(({ theme }) => ({
	fontFamily: 'Roboto',
	fontWeight: 500,
	display: 'none',
	marginLeft: '.5rem',

	[theme.breakpoints.up('lg')]: {
		display: 'inline',
	},
}));

export function ProfileUsername({ username }: ProfileUsernameProps): JSX.Element {
	return <Nickname>{username}</Nickname>;
}
