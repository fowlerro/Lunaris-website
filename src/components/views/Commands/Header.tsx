import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';
import tw from 'twin.macro';
const StyledHeader = styled.section`
	${tw`text-center px-4 pt-32`}
`;

const Paragraph = styled.p`
	${tw`text-text-secondary font-light text-base leading-loose tracking-wider text-center mb-8 whitespace-pre-line
    md:text-lg md:text-left md:max-w-md`}
`;

export default function Header(): JSX.Element {
	const { t } = useTranslation();
	return (
		<StyledHeader>
			<h1>{t('common:commands')}</h1>
			<Paragraph>{t('commandsPage:headerParagraph')}</Paragraph>
		</StyledHeader>
	);
}
