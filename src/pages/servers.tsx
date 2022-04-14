import type { NextPage } from 'next';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import Servers from '@views/Servers';

const ServersPage: NextPage = () => {
	const { t } = useTranslation('serversPage');
	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
			</Head>
			<Servers />
		</>
	);
};

export default ServersPage;
