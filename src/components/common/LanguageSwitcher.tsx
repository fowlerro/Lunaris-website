import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import usePersistLocaleCookie from '@hooks/usePersistLocaleCookie';
import styled from 'styled-components';

const StyledLink = styled.a`
	color: ${({ theme }) => theme.colors.white};
	text-decoration: none;
`;

export default function LanguageSwitcher() {
	const router = useRouter();
	const { t } = useTranslation('common');

	usePersistLocaleCookie();

	return (
		<Link passHref href={router.asPath} locale={router.locales?.find(locale => router.locale !== locale)}>
			<StyledLink>{t('common:languageName')}</StyledLink>
		</Link>
	);
}
