import Image from 'next/image';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import logo from '@assets/logo192.png';

const StyledDiv = styled.div`
	${tw`w-12 h-12 ml-4 md:w-16 md:h-16 lg:w-20 lg:h-20`}
`;

export default function Logo(): JSX.Element {
	return (
		<StyledDiv role='img' aria-label='logo'>
			<Image src={logo} alt='Logo' />
		</StyledDiv>
	);
}
