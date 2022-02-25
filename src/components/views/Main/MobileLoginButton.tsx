import { useTranslation } from 'next-i18next';
import { keyframes } from '@emotion/react';
import { Button, styled } from '@mui/material';

import { loginURL } from '@components/layout/Topbar/UserMenu';
import useUser from '@hooks/useUser';

const ButtonSlide = keyframes`
  from { transform: translateX(0) }
  to { transform: translateX(-25%) }
`;

const MobileButton = styled(Button)`
	margin-top: 3rem;
	margin-bottom: 1rem;
	animation: ${ButtonSlide} 350ms 300ms;
	animation-fill-mode: forwards;
	min-width: 8em;
`;

export function MobileLoginButton(): JSX.Element {
	const user = useUser({});
	const { t } = useTranslation();
	return (
		<MobileButton variant='contained' href={user ? '/dashboard' : loginURL}>
			{user ? t('common:dashboard') : t('common:login')}
		</MobileButton>
	);
}
