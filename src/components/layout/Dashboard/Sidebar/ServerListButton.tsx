import { useTranslation } from 'next-i18next';

import Link from '@components/Link';
import { MenuItem } from '@mui/material';
import Icon from '@components/Icon';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function ServerListButton(): JSX.Element {
	const { t } = useTranslation('layout');

	return (
		<Link href='/servers' sx={{ textDecoration: 'none', color: theme => theme.colors.text.primary }}>
			<MenuItem
				sx={{
					borderColor: theme => theme.colors.primary.main,
					borderWidth: '2px',
					borderStyle: 'solid',
					'&:hover': {
						backgroundColor: theme => theme.colors.primary.main,
					},
				}}
			>
				<Icon icon={faChevronLeft} sx={{ marginRight: '1rem' }} />
				{t('dashboardSidebar.backToServers')}
			</MenuItem>
		</Link>
	);
}
