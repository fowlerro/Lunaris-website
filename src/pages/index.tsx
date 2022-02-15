import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TopbarMobile from '@components/Topbar/Mobile/TopbarMobile';
import TopbarDesktop from '@components/Topbar/Desktop/TopbarDesktop';

import { GlobalStyle } from '@styles/GlobalStyle';
import Theme from '@styles/theme';
import { Media } from '@styles/Media';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en')),
		},
	};
};

const Home: NextPage = () => {
	return (
		<Theme>
			<GlobalStyle />
			<Head>
				<title>Lunaris - Discord Bot</title>
				<meta name='description' content='Website Dashboard for Discord bot - Lunaris' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Media at='sm'>
				<TopbarMobile />
			</Media>
			<Media greaterThan='sm'>
				<TopbarDesktop />
			</Media>
		</Theme>
	);
};

export default Home;
