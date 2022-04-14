import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import DashboardLayout from '@layouts/DashboardLayout';
import Levels from '@views/Dashboard/Levels';
import useVisitedFeatures from '@hooks/useVisitedFeatures';

import type { NextPageWithLayout } from 'src/pages/_app';

const DashboardLevelsPage: NextPageWithLayout = () => {
	const { t } = useTranslation('levelsPage');
	useVisitedFeatures('set', 'levels');
	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
			</Head>
			<Levels />
		</>
	);
};

DashboardLevelsPage.Layout = DashboardLayout;

export default DashboardLevelsPage;
