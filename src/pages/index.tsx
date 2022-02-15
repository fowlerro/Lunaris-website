import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Lunaris - Discord Bot</title>
				<meta name='description' content='Website Dashboard for Discord bot - Lunaris' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
		</>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en')),
		},
	};
};

export default Home;
