import { useTranslation } from 'next-i18next';

import Link from '@components/Link';

export const loginURL = `${process.env.API_URL}/auth/discord`;

export default function LoginButton(): JSX.Element {
	const { t } = useTranslation('common');

	return (
		<Link href={loginURL} noLinkStyle underline='none'>
			{t('common:login')}
		</Link>
	);
}
