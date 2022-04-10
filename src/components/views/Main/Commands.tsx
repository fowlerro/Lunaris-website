import { useTranslation } from 'next-i18next';

import { styled, Typography } from '@mui/material';
import Link from '@components/Link';

const Paragraph = styled(Typography)({
	whiteSpace: 'pre-line',
	marginTop: '1rem',
	maxWidth: '30rem',
});

const Section = styled('section')(({ theme }) => ({
	backgroundColor: theme.colors.background.primary,
	textAlign: 'center',
	padding: '4rem 1rem',

	[theme.breakpoints.up('md')]: {
		backgroundColor: theme.colors.background.secondary,
		textAlign: 'left',
		paddingLeft: '15%',
	},
}));

const StyledLink = styled(Link)(({ theme }) => ({
	color: theme.colors.text.primary,
	textDecoration: 'none',
	'&:hover': {
		textDecoration: 'underline',
	},
}));

export default function Commands(): JSX.Element {
	const { t } = useTranslation();
	return (
		<Section>
			<Typography variant='h2'>{t('common:commands')}</Typography>
			<Paragraph variant='subtitle1' sx={{ lineHeight: 1 }}>
				{t('mainPage:commandParagraph')}
			</Paragraph>
			<StyledLink href='/commands'>
				<Paragraph variant='subtitle1' sx={{ lineHeight: 1 }}>
					{t('mainPage:commandParagraph2')}
				</Paragraph>
			</StyledLink>
		</Section>
	);
}
