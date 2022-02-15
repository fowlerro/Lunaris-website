import React from 'react';
import styled from 'styled-components';
import MenuItems from '../MenuItems';

interface IProps {
	expanded: boolean;
}

const Navmenu = styled.ul<IProps>`
	position: absolute;
	list-style: none;
	background: ${({ theme }) => theme.colors.background.lighter};
	width: 100%;
	margin: 0;
	padding: 0;
	left: 0;
	top: 100%;
	box-shadow: 0px 10px 10px 2px rgba(0, 0, 0, 0.25);
	transform-origin: top;
	transform: ${({ expanded }) => (expanded ? 'scale(1, 1)' : 'scale(1, 0)')};
	transition: transform 0.2s ease-in-out;

	a {
		color: ${({ theme }) => theme.colors.white};
		text-decoration: none;
		transition: ${({ expanded }) => (expanded ? 'opacity 150ms ease-in-out 100ms' : 'opacity 100ms ease-in-out')};
		opacity: ${({ expanded }) => (expanded ? 1 : 0)};
	}
`;

export default function Menu(props: IProps & React.HTMLAttributes<HTMLUListElement>): JSX.Element {
	return (
		<Navmenu {...props}>
			<MenuItems />
		</Navmenu>
	);
}
