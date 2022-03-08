import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Header from '@views/Modules/Header';
import ModuleSection from '@views/Modules/ModuleSection';
import FormSection from '@views/Modules/FormSection';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Lunaris - Modules</title>
				<meta name='description' content='Website Dashboard for Discord bot - Lunaris' />
			</Head>
			<Header />
			<ModuleSection />
			<FormSection />
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
