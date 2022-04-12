import type { NextPage } from 'next';
import Head from 'next/head';

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

export default Contact;
