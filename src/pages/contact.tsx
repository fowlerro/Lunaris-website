import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Header from '@views/Contact/Header';

const Contact: NextPage = () => {
	return (
		<>
			<Head>
				<title>Lunaris - Contact Me</title>
				<meta name='description' content='Website Dashboard for Discord bot - Lunaris' />
			</Head>
			<Header />
		</>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en', ['common', 'layout', 'contactPage'])),
		},
	};
};

export default Contact;
