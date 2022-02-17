import styled from '@emotion/styled';
import tw from 'twin.macro';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';

import LanguageSwitcher from '@components/LanguageSwitcher';
import LoginButton from '../LoginButton';

const RightItems = styled.ul`
	${tw`flex items-center list-none`}

	li {
		${tw`mr-6`}
	}
`;

const Icon = styled(FontAwesomeIcon)`
	${tw`text-2xl`}
`;

export default function TopbarRightItems(): JSX.Element {
	return (
		<RightItems role='navigation'>
			<li aria-label='language switcher'>
				<LanguageSwitcher />
			</li>
			<li aria-label='notifications'>
				<Icon icon={faBell} />
			</li>
			<li aria-label='login' role='button'>
				<LoginButton />
			</li>
		</RightItems>
	);
}
