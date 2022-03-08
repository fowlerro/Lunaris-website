import { useTranslation } from 'next-i18next';
import { styled, Typography } from '@mui/material';

const Section = styled('section')(({ theme }) => ({
	backgroundColor: theme.colors.background.primary,
	marginInline: '1rem',
	marginTop: '6rem',
	textAlign: 'center',
	alignItems: 'center',
	marginBottom: '2rem',

	[theme.breakpoints.up('md')]: {
		textAlign: 'left',
	},

	[theme.breakpoints.up('lg')]: {
		paddingInline: '10%',
	},
}));

export default function Header(): JSX.Element {
	const { t } = useTranslation();
	return (
		<Section>
			<Typography variant='h1'>{t('common:modules')}</Typography>
			<Typography
				variant='subtitle1'
				paragraph
				role='paragraph'
				sx={{
					color: theme => theme.colors.text.secondary,
					marginTop: '.5rem',
				}}
			>
				{t('modulesPage:headerParagraph')}
			</Typography>
		</Section>
	);
}
