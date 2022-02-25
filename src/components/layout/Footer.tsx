import { useTranslation } from 'next-i18next';
import { styled, Typography } from '@mui/material';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '@components/Link';

const StyledFooter = styled('footer')(({ theme }) => ({
	position: 'relative',
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	rowGap: '2rem',
	backgroundColor: theme.colors.background.darker,
	paddingInline: '1rem',
	paddingBlock: '5rem',

	[theme.breakpoints.up('md')]: {
		paddingBlock: '8rem',
		gridTemplateColumns: '1fr 1fr 1fr',
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

const Copyright = styled(Typography)(({ theme }) => ({
	position: 'absolute',
	bottom: '.5rem',
	width: '100%',
	textAlign: 'center',
	color: theme.colors.text.muted,
}));

const Icon = styled(FontAwesomeIcon)({
	marginRight: '.5rem',
});

export default function Footer(): JSX.Element {
	const { t } = useTranslation('layout', { keyPrefix: 'footer' });
	return (
		<StyledFooter>
			<Section>
				<Header variant='h5'>{t('usefulLinks')}</Header>
				<StyledLink href='/commands'>{t('commands')}</StyledLink>
				<StyledLink href='/modules'>{t('modules')}</StyledLink>
				<StyledLink href='/dashboard'>{t('dashboard')}</StyledLink>
			</Section>
			<Section>
				<Header variant='h5'>{t('privacy')}</Header>
				<StyledLink href='/terms-of-use'>{t('terms')}</StyledLink>
				<StyledLink href='/privacy'>{t('privacyPolicy')}</StyledLink>
			</Section>
			<Section>
				<Header variant='h5'>{t('contact')}</Header>
				<StyledLink href='/contact'>{t('contactForm')}</StyledLink>
				<StyledLink href='https://discordapp.com/users/313346190995619841' target='_blank'>
					<Icon icon={faDiscord} />
					Kamil#2107
				</StyledLink>
				<StyledLink href='mailto:email@example.com'>email@example.com</StyledLink>
			</Section>
			<Copyright variant='caption'>Copyright © 2022 Kamil Wenta. All rights reserved.</Copyright>
		</StyledFooter>
	);
}
