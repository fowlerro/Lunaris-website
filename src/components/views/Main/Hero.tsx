import Button from '@components/Button/Button';
import { Media } from '@styles/Media';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import Illustration from './Illustration';

const Header = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 1em;

	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		margin-left: 15%;
		margin-right: 10%;
		align-items: flex-start;
		flex-direction: row-reverse;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		margin: 0;
		margin-right: 10%;
		margin-left: auto;
		justify-content: space-between;
		max-width: 1500px;
	}
`;

const Typography = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		align-items: flex-start;
		margin-top: 250px;
	}
`;

const H1 = styled.h1`
	color: ${({ theme }) => theme.colors.white};
	font-size: 3rem;
	font-weight: 700;
	margin-bottom: 0;

	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		font-size: 4rem;
	}
`;

const Paragraph = styled.p`
	color: ${({ theme }) => theme.colors.text.secondary};
	font-weight: 300;
	font-size: 1rem;
	line-height: 40px;
	letter-spacing: 0.05em;
	text-align: center;

	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		font-size: 1.2rem;
		text-align: left;
		max-width: 450px;
	}
`;

const ButtonPrimarySlide = keyframes`
  from { transform: translateX(0)}
  to { transform: translateX(-30%)}
`;
const ButtonSecondarySlide = keyframes`
  from { transform: translateX(0)}
  to { transform: translateX(30%)}
`;

const StyledPrimaryButton = styled(Button)`
	margin-top: 3em;
	margin-bottom: 2em;

	animation: ${ButtonPrimarySlide} 350ms ease-out 300ms;
	animation-fill-mode: forwards;
`;

const StyledSecondaryButton = styled(Button)`
	animation: ${ButtonSecondarySlide} 350ms ease-out 300ms;
	animation-fill-mode: forwards;
`;

const StyledMedia = styled(Media)`
	display: flex;
	flex-direction: column;
`;

export default function Hero(): JSX.Element {
	const { t } = useTranslation();

	return (
		<Header>
			<Illustration />
			<Typography>
				<H1>Lunaris</H1>
				<Paragraph>{t('mainPage:heroParagraph')}</Paragraph>
				<StyledMedia greaterThan='sm'>
					<Button>{t('common:inviteBot')}</Button>
				</StyledMedia>
			</Typography>
			<StyledMedia at='sm'>
				<StyledPrimaryButton>{t('common:login')}</StyledPrimaryButton>
				<StyledSecondaryButton variant='secondary'>{t('common:inviteBot')}</StyledSecondaryButton>
			</StyledMedia>
		</Header>
	);
}
