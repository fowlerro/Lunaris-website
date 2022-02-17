import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import tw from 'twin.macro';

const Button = styled.button`
	${tw`bg-none border-none text-text-muted text-base font-normal lg:text-xl relative hover:text-white`}

	&::after {
		${tw`content absolute w-full scale-x-0 h-0.5 bottom-0 left-0 bg-primary transition-transform duration-200 ease-out`}
	}

	&:hover::after {
		${tw`scale-x-100`}
	}
`;

export default function LoginButton(): JSX.Element {
	const { t } = useTranslation('common');
	return <Button>{t('login')}</Button>;
}
