import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	background: none;
	border: none;
	color: ${({ theme }) => theme.colors.text.muted};
	font-size: 1rem;
	font-weight: 400;

	@media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
		font-size: 1.2rem;
	}
`;

export default function LoginButton(): JSX.Element {
	const { t } = useTranslation('common');
	return <Button>{t('login')}</Button>;
}
