import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import LanguageSwitcher from '@components/LanguageSwitcher';
import styled from 'styled-components';

interface IProps {
	expanded: boolean;
	setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightItems = styled.ul`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	list-style: none;
	position: relative;

	li {
		margin-right: 1.5em;
	}
`;

const Icon = styled(FontAwesomeIcon)`
	font-size: 1.5em;
`;

const Hamburger = styled.button`
	margin-left: 1em;
	margin-right: 1.5em;
	min-width: 2.2em;
	background: none;
	border: 0;
	color: ${({ theme }) => theme.colors.white};
	cursor: pointer;
`;

export default function TopbarRightItems({ expanded, setExpanded }: IProps): JSX.Element {
	return (
		<RightItems role='navigation'>
			<li aria-label='language switcher'>
				<LanguageSwitcher />
			</li>
			<li aria-label='notifications'>
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
