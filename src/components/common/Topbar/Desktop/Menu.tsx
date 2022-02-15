import React from 'react';
import styled from 'styled-components';
import MenuItems from '../MenuItems';

const Navmenu = styled.ul`
	display: flex;
	max-width: 800px;
	flex-grow: 1;
	list-style: none;
	justify-content: space-evenly;

	a {
		color: ${({ theme }) => theme.colors.white};
		text-decoration: none;
	}
`;

export default function Menu(props: React.HTMLAttributes<HTMLUListElement>): JSX.Element {
	return (
		<Navmenu {...props}>
			<MenuItems />
		</Navmenu>
	);
}
