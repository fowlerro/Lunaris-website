import useTranslation from 'next-translate/useTranslation';

import { Button, styled, Typography } from '@mui/material';
import Avatar from '@components/Avatar';

import logo from '@assets/logo144.png';

const Section = styled('section')(({ theme }) => ({
	backgroundColor: theme.colors.background.primary,
	display: 'flex',
	flexDirection: 'column',
	marginInline: '1rem',
	marginTop: '6rem',
	textAlign: 'center',
	alignItems: 'center',
	marginBottom: '2rem',
	maxWidth: theme.breakpoints.values.xxl,
	minHeight: '30rem',

	[theme.breakpoints.up('md')]: {
		textAlign: 'left',
		alignItems: 'flex-start',
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
				<Button variant='outlined' startIcon={<Avatar src={logo} width='48' height='48' />} sx={{ marginTop: '4rem' }}>
					Join Lunaris Discord
				</Button>
			</TextWrapper>
		</Section>
	);
}
