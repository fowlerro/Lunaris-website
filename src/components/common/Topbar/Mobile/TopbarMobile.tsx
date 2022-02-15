import styled from 'styled-components';
import React, { useRef } from 'react';
import Menu from './Menu';
import useLockedBody from '@hooks/useLockedBody';
import useOnClickOutside from '@hooks/useOnClickOutside';
import TopbarRightItems from './TopbarRightItems';
import Logo from '../Logo';

const Navbar = styled.nav`
	width: 100%;
	padding: 0.2em;
	display: flex;
	position: relative;
	align-items: center;
	justify-content: space-between;
	background: ${({ theme }) => theme.colors.background.lighter};
	box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.25);
	z-index: 99;
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
		<Navbar ref={ref}>
			<Logo />
			<TopbarRightItems expanded={expanded} setExpanded={setExpanded} />
			<Menu id='navMenu' role='navigation' aria-labelledby='hamburgerButton' expanded={expanded} />
		</Navbar>
	);
}
