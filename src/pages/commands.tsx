import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

// import Header from '@views/Commands/Header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import CommandSection from '@views/Commands/CommandSection';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Lunaris - Discord Bot</title>
				<meta name='description' content='Website Dashboard for Discord bot - Lunaris' />
			</Head>
			{/* <Header /> */}
			<main>{/* <CommandSection /> */}</main>
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
