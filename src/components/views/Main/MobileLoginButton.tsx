import useTranslation from 'next-translate/useTranslation';

import { Button, styled } from '@mui/material';
import { keyframes } from '@emotion/react';

import useUser from '@hooks/useUser';
import { LOGIN_URL } from '@utils/constants';

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
		<MobileButton variant='contained' href={user ? '/dashboard' : LOGIN_URL}>
			{user ? t('common:dashboard') : t('common:login')}
		</MobileButton>
	);
}
