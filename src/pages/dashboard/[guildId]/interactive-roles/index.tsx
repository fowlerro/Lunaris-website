import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import InteractiveRoles from '@views/Dashboard/InteractiveRoles';
import InteractiveRolesList from '@views/Dashboard/InteractiveRoles/Views/List';
import useVisitedFeatures from '@hooks/useVisitedFeatures';

import type { NextPageWithLayout } from 'src/pages/_app';

const InteractiveRolesPage: NextPageWithLayout = () => {
	const { t } = useTranslation('interactiveRolesPage');
	useVisitedFeatures('set', 'interactiveRoles');

	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
			</Head>
			<InteractiveRolesList />
		</>
	);
};

InteractiveRolesPage.Layout = InteractiveRoles;

export default InteractiveRolesPage;
