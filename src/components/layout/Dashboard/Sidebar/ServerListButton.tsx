import useTranslation from 'next-translate/useTranslation';

import { MenuItem, styled } from '@mui/material';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Link from '@components/Link';
import Icon from '@components/Icon';

const StyledLink = styled(Link)(({ theme }) => ({
	textDecoration: 'none',
	color: theme.colors.text.primary,
}));

export default function ServerListButton(): JSX.Element {
	const { t } = useTranslation('layout');

	return (
		<StyledLink href='/servers' passHref>
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
		</StyledLink>
	);
}
