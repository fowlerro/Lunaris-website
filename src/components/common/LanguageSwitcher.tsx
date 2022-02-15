import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

import usePersistLocaleCookie from '@hooks/usePersistLocaleCookie';

const StyledLink = styled.a`
	color: ${({ theme }) => theme.colors.white};
	font-weight: 600;
	text-decoration: none;
	line-height: 1.8em;
`;

export default function LanguageSwitcher() {
	const router = useRouter();
	const { t } = useTranslation('common');

	usePersistLocaleCookie();

	return (
		<Link passHref href={router.asPath} locale={router.locales?.find(locale => router.locale !== locale)}>
			<StyledLink role='switch' aria-label='Language switcher' aria-details={router.locale}>
				{t('common:languageName')}
			</StyledLink>
		</Link>
	);
}
