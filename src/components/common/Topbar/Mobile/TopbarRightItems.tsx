import styled from '@emotion/styled';
import tw from 'twin.macro';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import LanguageSwitcher from '@components/LanguageSwitcher';

interface IProps {
	expanded: boolean;
	setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightItems = styled.ul`
	${tw`flex flex-wrap items-center list-none relative`}

	li {
		${tw`mr-6`}
	}
`;

const Icon = styled(FontAwesomeIcon)`
	${tw`text-2xl`}
`;

const Hamburger = styled.button`
	${tw`ml-4 mr-6 min-w-[2.2rem] bg-none border-0 text-white cursor-pointer`}
`;

export default function TopbarRightItems({ expanded, setExpanded }: IProps): JSX.Element {
	return (
		<RightItems role='navigation' aria-label='Action buttons'>
			<li aria-label='language switcher'>
				<LanguageSwitcher />
			</li>
			<li aria-label='Notifications'>
				<Icon icon={faBell} />
			</li>
			<Hamburger
				id='hamburgerButton'
				aria-expanded={expanded}
				aria-controls='navMenu'
				onClick={() => setExpanded(!expanded)}
			>
				<Icon icon={expanded ? faXmark : faBars} />
			</Hamburger>
		</RightItems>
	);
}
