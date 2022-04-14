import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import DashboardLayout from '@layouts/DashboardLayout';
import AutoRoles from '@views/Dashboard/AutoRoles';
import useVisitedFeatures from '@hooks/useVisitedFeatures';

import type { NextPageWithLayout } from 'src/pages/_app';

const DashboardAutoRolesPage: NextPageWithLayout = () => {
	const { t } = useTranslation('autoRolesPage');
	useVisitedFeatures('set', 'autoRoles');
	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
			</Head>
			<AutoRoles />
		</>
	);
};

DashboardAutoRolesPage.Layout = DashboardLayout;

export default DashboardAutoRolesPage;
