import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import InteractiveRoles from '@views/Dashboard/InteractiveRoles';
import InteractiveRolesCreator from '@views/Dashboard/InteractiveRoles/InteractiveRolesCreator';
import useVisitedFeatures from '@hooks/useVisitedFeatures';

import type { NextPageWithLayout } from 'src/pages/_app';

const InteractiveRoleCreatorPage: NextPageWithLayout = () => {
	const { t } = useTranslation('interactiveRolesPage');
	useVisitedFeatures('set', 'interactiveRoles');

	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
			</Head>
			<InteractiveRolesCreator />
		</>
	);
};

InteractiveRoleCreatorPage.Layout = InteractiveRoles;

export default InteractiveRoleCreatorPage;
