import styled from '@emotion/styled';
import tw from 'twin.macro';

import MenuItems from '../MenuItems';

interface IProps {
	expanded: boolean;
}

const Navmenu = styled.ul<IProps>`
	${tw`absolute list-none bg-background-lighter w-full m-0 p-0 left-0 top-full shadow-xl
    origin-top transition-transform duration-200 ease-in-out`}
	${({ expanded }) => (expanded ? tw`scale-100` : tw`scale-x-100 scale-y-0`)}

  a {
		${tw`text-white no-underline transition-opacity ease-in-out`}
		${({ expanded }) => (expanded ? tw`opacity-100 duration-200 delay-150` : tw`opacity-0 duration-100`)}
	}
`;

export default function Menu(props: IProps & React.HTMLAttributes<HTMLUListElement>): JSX.Element {
	return (
		<Navmenu {...props}>
			<MenuItems />
		</Navmenu>
	);
}
