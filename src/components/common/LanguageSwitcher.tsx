import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import styled from '@emotion/styled';
import tw from 'twin.macro';

import usePersistLocaleCookie from '@hooks/usePersistLocaleCookie';

const StyledLink = styled.a`
	${tw`font-semibold no-underline leading-7 text-white`}
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
