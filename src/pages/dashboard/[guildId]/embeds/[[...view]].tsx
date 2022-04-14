import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import Embeds from '@views/Dashboard/Embeds';
import DashboardLayout from '@layouts/DashboardLayout';
import useVisitedFeatures from '@hooks/useVisitedFeatures';

import type { NextPageWithLayout } from 'src/pages/_app';

const DashboardEmbedsPage: NextPageWithLayout = () => {
	const { t } = useTranslation('embedsPage');
	useVisitedFeatures('set', 'embedMessages');

	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
			</Head>
			<Embeds />
		</>
	);
};

DashboardEmbedsPage.Layout = DashboardLayout;

export default DashboardEmbedsPage;
