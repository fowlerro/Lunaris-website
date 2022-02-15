import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';

import LanguageSwitcher from '@components/LanguageSwitcher';
import styled from 'styled-components';
import LoginButton from '../LoginButton';

const RightItems = styled.ul`
	display: flex;
	align-items: center;
	list-style: none;

	li {
		margin-right: 1.5em;
	}
`;

const Icon = styled(FontAwesomeIcon)`
	font-size: 1.5rem;
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
