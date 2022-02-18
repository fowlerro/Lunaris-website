import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';
import tw from 'twin.macro';

const Section = styled.section`
	${tw`bg-background-primary text-center py-16 px-4 md:bg-background-secondary md:text-left md:pl-[15%]`}
`;

const Paragraph = styled.p`
	${tw`whitespace-pre-line mt-4 md:text-lg md:max-w-md`}
`;

export default function Commands(): JSX.Element {
	const { t } = useTranslation();
	return (
		<Section>
			<h2>{t('common:commands')}</h2>
			<Paragraph>{t('mainPage:commandParagraph')}</Paragraph>
		</Section>
	);
}
