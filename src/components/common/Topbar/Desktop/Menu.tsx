import styled from '@emotion/styled';
import tw from 'twin.macro';

import MenuItems from '../MenuItems';

const Navmenu = styled.ul`
	${tw`flex max-w-3xl flex-grow list-none justify-evenly`}

	a {
		${tw`text-white no-underline`}
	}
`;

export default function Menu(props: React.HTMLAttributes<HTMLUListElement>): JSX.Element {
	return (
		<Navmenu {...props}>
			<MenuItems />
		</Navmenu>
	);
}
