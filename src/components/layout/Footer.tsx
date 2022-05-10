import useTranslation from 'next-translate/useTranslation';

import { styled, Typography } from '@mui/material';

import Link from '@components/Link';

import { SUPPORT_INVITE_URL } from '@utils/constants';

const StyledFooter = styled('footer')(({ theme }) => ({
	position: 'relative',
	textAlign: 'center',
	display: 'grid',
	gridTemplateColumns: '1fr',
	justifyItems: 'center',
	rowGap: '2rem',
	backgroundColor: theme.colors.background.darker,
	paddingInline: '1rem',
	paddingBlock: '5rem',

	[theme.breakpoints.up('md')]: {
		textAlign: 'left',
		paddingBlock: '8rem',
		gridTemplateColumns: '1fr 1fr',
		justifyItems: 'center',
	},
}));

const Section = styled('section')({
	display: 'flex',
	flexDirection: 'column',
});

const Header = styled(Typography)(({ theme }) => ({
	color: theme.colors.text.muted,
	fontWeight: 600,
}));

const StyledLink = styled(Link)(({ theme }) => ({
	color: theme.colors.text.primary,
	textDecoration: 'none',
	fontSize: '0.875rem',
	lineHeight: '1.25rem',
	marginBlock: '.125rem',

	'&:hover': {
		textDecoration: 'underline',
	},
}));

export default function Footer(): JSX.Element {
	const { t } = useTranslation('layout');
	return (
		<StyledFooter>
			<Section>
				<Header variant='h5'>{t('footer.usefulLinks')}</Header>
				<StyledLink href='/'>{t('nav.home')}</StyledLink>
				<StyledLink href='/commands'>{t('nav.commands')}</StyledLink>
				<StyledLink href='/dashboard'>{t('nav.dashboard')}</StyledLink>
			</Section>
			<Section>
				<Header variant='h5'>{t('footer.contact')}</Header>
				<StyledLink href={SUPPORT_INVITE_URL} target='_blank'>
					{t('footer.support')}
				</StyledLink>
				<StyledLink href='mailto:support@lunaris.pro'>support@lunaris.pro</StyledLink>
			</Section>
		</StyledFooter>
	);
}
