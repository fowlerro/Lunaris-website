import type { NextPage } from 'next';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import Hero from '@views/Main/Hero';

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
		</>
	);
};

export default Home;
