import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Hero from '@views/Main/Hero';
import Modules from '@views/Main/Modules/Modules';
import Commands from '@views/Main/Commands';

const Home: NextPage = () => {
	const { t } = useTranslation('mainPage');
	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Hero />
			<Modules />
			<Commands />
		</>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en', ['common', 'mainPage', 'modules', 'layout'])),
		},
	};
};

export default Home;
