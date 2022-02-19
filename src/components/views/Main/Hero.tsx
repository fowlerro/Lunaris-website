import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import tw from 'twin.macro';

import Button from '@components/Button/Button';
import { Media } from '@styles/Media';
import Illustration from './Illustration';
import { MobileLoginButton } from '@components/LoginButton';

const Header = styled.header`
	${tw`flex flex-col items-center my-0 mx-4 pb-[35%]
    md:ml-[15%] md:mr-[10%] md:items-start md:flex-row-reverse md:h-[90vh] md:pb-0
    xl:m-0 xl:mr-[10%] xl:ml-auto xl:justify-between xl:max-w-screen-2xl`}
`;

const Typography = styled.div`
	${tw`flex flex-col items-center md:items-start md:mt-80`}
`;

const Paragraph = styled.p`
	${tw`text-text-secondary font-light text-base leading-loose tracking-wider text-center mb-8
    md:text-lg md:text-left md:max-w-md`}
`;

const ButtonSecondarySlide = keyframes`
  from { transform: translateX(0)}
  to { transform: translateX(25%)}
`;

const StyledSecondaryButton = styled(Button)`
	animation: ${ButtonSecondarySlide} 350ms ease-out 300ms;
	animation-fill-mode: forwards;
`;

const StyledMedia = styled(Media)`
	${tw`flex flex-col`}
`;

const inviteLink =
	'https://discord.com/api/oauth2/authorize?client_id=739412828737372181&permissions=0&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Finvite%2Fredirect&response_type=code&scope=identify%20bot%20applications.commands';

export default function Hero(): JSX.Element {
	const { t } = useTranslation();

	return (
		<Header>
			<Illustration />
			<Typography>
				<h1>Lunaris</h1>
				<Paragraph>{t('mainPage:heroParagraph')}</Paragraph>
				<StyledMedia greaterThan='sm'>
					<a href={inviteLink}>
						<Button>{t('common:inviteBot')}</Button>
					</a>
				</StyledMedia>
			</Typography>
			<StyledMedia at='sm'>
				<MobileLoginButton />
				<StyledSecondaryButton href={inviteLink} variant='secondary'>
					{t('common:inviteBot')}
				</StyledSecondaryButton>
			</StyledMedia>
		</Header>
	);
}
