import Image from 'next/image';
import styled from 'styled-components';
import logo from '@assets/logo192.png';

const StyledDiv = styled.div`
	width: 48px;
	height: 48px;
	margin-left: 1em;

	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		width: 64px;
		height: 64px;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
		width: 84px;
		height: 84px;
	}
`;

export default function Logo(): JSX.Element {
	return (
		<StyledDiv role='img' aria-label='logo'>
			<Image src={logo} alt='Logo' />
		</StyledDiv>
	);
}
