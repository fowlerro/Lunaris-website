import Button from '@components/Button/Button';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import useUser from '@hooks/useUser';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import tw from 'twin.macro';

const Slide = keyframes`
  from { transform: translateX(0)}
  to { transform: translateX(-25%)}
`;

const MobileButton = styled(Button)`
	${tw`mt-12 mb-8`}
	animation: ${Slide} 350ms 300ms;
	animation-fill-mode: forwards;
`;

const DesktopButton = styled.button`
	${tw`bg-none border-none text-text-muted text-base font-normal lg:text-xl relative hover:text-white`}

	&::after {
		${tw`content absolute w-full scale-x-0 h-0.5 bottom-0 left-0 bg-primary transition-transform duration-200 ease-out`}
	}

	&:hover::after {
		${tw`scale-x-100`}
	}
`;

const loginURL = `${process.env.apiDomain}/api/auth/discord`;

export function MobileLoginButton(): JSX.Element {
	const user = useUser({});
	const { t } = useTranslation();
	return (
		<MobileButton href={user ? '/dashboard' : loginURL}>
			{user ? t('common:gotoDashboard') : t('common:login')}
		</MobileButton>
	);
}

export function DesktopLoginButton(): JSX.Element {
	const user = useUser({});
	const { t } = useTranslation();
	return (
		<Link href={user ? '/dashboard' : loginURL} passHref>
			<DesktopButton>{user ? t('common:gotoDashboard') : t('common:login')}</DesktopButton>
		</Link>
	);
}
