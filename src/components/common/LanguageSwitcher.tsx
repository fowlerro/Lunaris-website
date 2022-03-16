import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Link from './Link';
import usePersistLocaleCookie from '@hooks/usePersistLocaleCookie';
import { IconButton } from '@mui/material';
import moment from 'moment';

export default function LanguageSwitcher() {
	const router = useRouter();
	const { t } = useTranslation('common');

	usePersistLocaleCookie();

	moment.locale(router.locale);

	return (
		<IconButton
			component={Link}
			passHref
			href={router.asPath}
			locale={router.locales?.find(locale => router.locale !== locale)}
			color='inherit'
			underline='none'
			aria-label='Language switcher'
			aria-details={router.locale}
			sx={{
				fontSize: '1rem',
				padding: '1rem',
				borderRadius: '50%',
				'&:hover': { backgroundColor: theme => theme.colors.background.lighter },
			}}
		>
			{t('common:languageName')}
		</IconButton>
	);
}
