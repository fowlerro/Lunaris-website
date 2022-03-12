import { Button, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';

const Section = styled('section')({
	padding: '1rem',
	textAlign: 'center',
});

export default function ServerListSection(): JSX.Element {
	const { t } = useTranslation('dashboardPage');
	return (
		<Section>
			<Button variant='outlined' href='/servers' sx={{ color: theme => theme.colors.text.primary }}>
				{t('serverList')}
			</Button>
		</Section>
	);
}
