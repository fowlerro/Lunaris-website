import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import DashboardLayout from '@layouts/DashboardLayout';

import type { NextPageWithLayout } from 'src/pages/_app';

const DashboardOverviewPage: NextPageWithLayout = () => {
	const { t } = useTranslation('dashboardPage');

	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
			</Head>
		</>
	);
};

DashboardOverviewPage.Layout = DashboardLayout;

export default DashboardOverviewPage;
