import type { NextPage } from 'next';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import Header from '@views/Contact/Header';

const Contact: NextPage = () => {
	const { t } = useTranslation('contactPage');
	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
			</Head>
			<Header />
		</>
	);
};

export default Contact;
