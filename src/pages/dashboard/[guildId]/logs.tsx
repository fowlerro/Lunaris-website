import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import DashboardLayout from '@layouts/DashboardLayout';
import ServerLogs from '@views/Dashboard/ServerLogs';

import useVisitedFeatures from '@hooks/useVisitedFeatures';

import type { NextPageWithLayout } from 'src/pages/_app';

const DashboardServerLogsPage: NextPageWithLayout = () => {
	const { t } = useTranslation('serverLogsPage');
	useVisitedFeatures('set', 'serverLogs');
	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
			</Head>
			<ServerLogs />
		</>
	);
};

DashboardServerLogsPage.Layout = DashboardLayout;

export default DashboardServerLogsPage;
