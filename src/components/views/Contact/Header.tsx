import { useTranslation } from 'next-i18next';

import { styled, Typography } from '@mui/material';

import Form from './Form';

const Section = styled('section')(({ theme }) => ({
	backgroundColor: theme.colors.background.primary,
	display: 'flex',
	flexDirection: 'column',
	marginInline: '1rem',
	marginTop: '6rem',
	textAlign: 'center',
	alignItems: 'flex-start',
	marginBottom: '2rem',
	maxWidth: theme.breakpoints.values.xxl,
	minHeight: '30rem',

	[theme.breakpoints.up('md')]: {
		textAlign: 'left',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	[theme.breakpoints.up('lg')]: {
		paddingInline: '10%',
	},
}));

const TextWrapper = styled('div')({
	maxWidth: '500px',
	marginBottom: '2rem',
	alignSelf: 'flex-start',
});

export default function Header(): JSX.Element {
	const { t } = useTranslation();
	return (
		<Section>
			<TextWrapper>
				<Typography variant='h1'>{t('common:contactMe')}</Typography>
				<Typography
					variant='subtitle1'
					paragraph
					role='paragraph'
					sx={{
						color: theme => theme.colors.text.secondary,
						marginTop: '.5rem',
					}}
				>
					{t('contactPage:headerParagraph')}
				</Typography>
			</TextWrapper>
			<Form />
		</Section>
	);
}
