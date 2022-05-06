import useTranslation from 'next-translate/useTranslation';

import { IconButton, Tooltip } from '@mui/material';

import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';
import Link from '@components/Link';

export default function Logout(): JSX.Element {
	const { t } = useTranslation('layout');
	return (
		<Tooltip title={t('profileMenu.logout')}>
			<Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`} sx={{ marginLeft: '1rem' }}>
				<IconButton color='error'>
					<Icon icon={faRightToBracket} />
				</IconButton>
			</Link>
		</Tooltip>
	);
}
