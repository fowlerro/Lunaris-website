import React, { useRef } from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import useLockedBody from '@hooks/useLockedBody';
import useOnClickOutside from '@hooks/useOnClickOutside';
import TopbarRightItems from './TopbarRightItems';
import Menu from './Menu';
import Logo from '../Logo';

const Navbar = styled.nav`
	${tw`w-full p-1 flex relative items-center justify-between bg-background-lighter shadow-xl z-[99]`}
`;

export default function TopbarMobile(): JSX.Element {
	const [expanded, setExpanded] = React.useState(false);
	useLockedBody(expanded);

	const ref = useRef(null);

	const handleClickOutside = () => {
		setExpanded(false);
	};

	useOnClickOutside(ref, handleClickOutside);

	return (
		<Navbar ref={ref} aria-label='Topbar'>
			<Logo />
			<TopbarRightItems expanded={expanded} setExpanded={setExpanded} />
			<Menu id='navMenu' role='navigation' aria-labelledby='hamburgerButton' expanded={expanded} />
		</Navbar>
	);
}
