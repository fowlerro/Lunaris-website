import styled from '@emotion/styled';
import tw from 'twin.macro';

import MenuItems from '../MenuItems';

const Navmenu = styled.ul`
	${tw`flex max-w-3xl flex-grow list-none justify-evenly`}

	a {
		${tw`text-white no-underline relative`}
	}

	a::after {
		${tw`content absolute w-full scale-x-0 h-0.5 bottom-0 left-0 bg-primary origin-bottom transition-transform duration-200 ease-out`}
	}

	a:hover::after {
		${tw`scale-x-100`}
	}
`;

export default function Menu(props: React.HTMLAttributes<HTMLUListElement>): JSX.Element {
	return (
		<Navmenu {...props}>
			<MenuItems />
		</Navmenu>
	);
}
