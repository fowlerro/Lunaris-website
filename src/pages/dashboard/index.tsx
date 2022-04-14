import type { NextPage } from 'next';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import ProfileSection from '@views/Dashboard/Profile/ProfileSection';
import ServerListSection from '@views/Dashboard/ServerListSection';

const Dashboard: NextPage = () => {
	const { t } = useTranslation('profilePage');
	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
			</Head>
			<ProfileSection />
			<ServerListSection />
		</>
	);
};

export default Dashboard;
