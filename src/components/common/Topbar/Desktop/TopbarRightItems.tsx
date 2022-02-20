import styled from '@emotion/styled';
import tw from 'twin.macro';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';

import LanguageSwitcher from '@components/LanguageSwitcher';
import { DesktopLoginButton } from '@components/LoginButton';

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
		<RightItems role='navigation' aria-label='Action buttons'>
			<li aria-label='language switcher'>
				<LanguageSwitcher />
			</li>
			<li aria-label='Notifications'>
				<Icon icon={faBell} />
			</li>
			<li>
				<DesktopLoginButton />
			</li>
		</RightItems>
	);
}
