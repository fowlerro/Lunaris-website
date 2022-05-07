import useTranslation from 'next-translate/useTranslation';

import { Box } from '@mui/system';
import { Button, styled, Typography, useTheme } from '@mui/material';
import { keyframes } from '@emotion/react';

import Illustration from './Illustration';
import { MobileLoginButton } from './MobileLoginButton';

import useIsDesktop from '@hooks/useIsDesktop';
import { inviteURL } from '@utils/constants';

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
	alignItems: 'center',

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
				<StyledButton variant={isDesktop ? 'contained' : 'outlined'} href={inviteURL}>
					{t('common:inviteBot')}
				</StyledButton>
			</TextWrapper>
		</Section>
	);
}
