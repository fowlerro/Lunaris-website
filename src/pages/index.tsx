import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { GlobalStyle } from '@styles/GlobalStyle';
import Theme from '@styles/theme';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from '@components/LanguageSwitcher';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en', ['common'])),
		},
	};
};

const Home: NextPage = () => {
	const { t } = useTranslation();

	return (
		<Theme>
			<GlobalStyle />
			<Head>
				<title>Lunaris - Discord Bot</title>
				<meta name='description' content='Website Dashboard for Discord bot - Lunaris' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<LanguageSwitcher />
			<p>{t('hello')}</p>
		</Theme>
	);
};

export default Home;
