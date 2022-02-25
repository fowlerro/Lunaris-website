import Image from 'next/image';
import { styled } from '@mui/material';
import logo from '@assets/logo192.png';

const Wrapper = styled('div')(({ theme }) => ({
	position: 'relative',
	width: '3em',
	height: '3em',
	margin: '1em',

	[theme.breakpoints.up('md')]: {
		width: '4em',
		height: '4em',
	},
}));

export default function Logo(): JSX.Element {
	return (
		<Wrapper>
			<Image src={logo} alt='Logo' layout='fill' />
		</Wrapper>
	);
}
