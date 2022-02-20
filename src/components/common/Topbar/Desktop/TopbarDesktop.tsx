import styled from '@emotion/styled';
import tw from 'twin.macro';

import Menu from './Menu';
import TopbarRightItems from './TopbarRightItems';
import Logo from '../Logo';

const Navbar = styled.nav`
	${tw`mx-auto mt-4 flex items-center justify-between lg:max-w-[90%] 2xl:max-w-screen-2xl`}
`;

export default function TopbarDesktop(): JSX.Element {
	return (
		<Navbar aria-label='Topbar'>
			<Logo />
			<Menu id='navMenu' role='navigation' />
			<TopbarRightItems />
		</Navbar>
	);
}
