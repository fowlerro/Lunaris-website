import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import tw from 'twin.macro';

const Button = styled.button`
	${tw`bg-none border-none text-text-muted text-base font-normal lg:text-xl`}
`;

export default function LoginButton(): JSX.Element {
	const { t } = useTranslation('common');
	return <Button>{t('login')}</Button>;
}
