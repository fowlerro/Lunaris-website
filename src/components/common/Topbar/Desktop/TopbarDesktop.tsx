import React from 'react';
import styled from 'styled-components';

import Menu from './Menu';
import TopbarRightItems from './TopbarRightItems';
import Logo from '../Logo';

const Navbar = styled.nav`
	margin-left: auto;
	margin-right: auto;
	margin-top: 1em;
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
		max-width: 90%;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.xxl}) {
		max-width: 1500px;
	}
`;

export default function TopbarDesktop(): JSX.Element {
	return (
		<Navbar>
			<Logo />
			<Menu id='navMenu' role='navigation' aria-labelledby='hamburgerButton' />
			<TopbarRightItems />
		</Navbar>
	);
}
