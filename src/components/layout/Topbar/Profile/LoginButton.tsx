import useTranslation from 'next-translate/useTranslation';

import Link from '@components/Link';

import { LOGIN_URL } from '@utils/constants';

export default function LoginButton(): JSX.Element {
	const { t } = useTranslation('common');

	return (
		<Link href={LOGIN_URL} noLinkStyle underline='none'>
			{t('common:login')}
		</Link>
	);
}
