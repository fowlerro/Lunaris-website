import { useTranslation } from 'next-i18next';
import { keyframes } from '@emotion/react';
import { Box } from '@mui/system';
import { Button, styled, Typography, useTheme } from '@mui/material';

import Illustration from './Illustration';
import { MobileLoginButton } from './MobileLoginButton';
import useIsDesktop from '@hooks/useIsDesktop';

const ButtonSlide = keyframes`
  from { transform: translateX(0) }
  to { transform: translateX(25%) }
`;

const Section = styled('section')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	textAlign: 'center',
	width: 'min(90%, 1366px)',
	marginInline: 'auto',
	marginBottom: '6rem',

	[theme.breakpoints.up('md')]: {
		flexDirection: 'row-reverse',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},
}));

const TextWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',

	[theme.breakpoints.up('md')]: {
		alignItems: 'flex-start',
		textAlign: 'left',
		maxWidth: '22em',
	},
}));

const StyledButton = styled(Button)(({ theme }) => ({
	animation: `${ButtonSlide} 350ms ease-out 300ms`,
	animationFillMode: 'forwards',

	[theme.breakpoints.up('md')]: {
		animation: 'none',
		marginTop: '1rem',
	},
}));

const inviteLink =
	'https://discord.com/api/oauth2/authorize?client_id=739412828737372181&permissions=0&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Finvite%2Fredirect&response_type=code&scope=identify%20bot%20applications.commands';

export default function Hero(): JSX.Element {
	const { t } = useTranslation();
	const theme = useTheme();
	const isDesktop = useIsDesktop();

	return (
		<Section>
			<Illustration />
			<TextWrapper>
				<Typography variant='h1'>Lunaris</Typography>
				<Typography
					variant='subtitle1'
					component='p'
					role='paragraph'
					sx={{ color: theme.colors.text.secondary, marginTop: '.5rem' }}
				>
					{t('mainPage:heroParagraph')}
				</Typography>
				{!isDesktop && <MobileLoginButton />}
				<StyledButton variant={isDesktop ? 'contained' : 'outlined'} href={inviteLink}>
					{t('common:inviteBot')}
				</StyledButton>
			</TextWrapper>
		</Section>
	);
}
