import useTranslation from 'next-translate/useTranslation';

import Link from '@components/Link';

import { loginURL } from '@utils/constants';

export default function LoginButton(): JSX.Element {
	const { t } = useTranslation('common');

	return (
		<Link href={loginURL} noLinkStyle underline='none'>
			{t('common:login')}
		</Link>
	);
}
