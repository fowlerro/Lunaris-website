import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Hero from '@views/Main/Hero';
// import Modules from '@views/Main/Modules/Modules';
// import Commands from '@views/Main/Commands';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Lunaris - Discord Bot</title>
				<meta name='description' content='Website Dashboard for Discord bot - Lunaris' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Hero />
			{/* <Modules />
				<Commands /> */}
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
