import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import InteractiveRoles from '@views/Dashboard/InteractiveRoles';
import useVisitedFeatures from '@hooks/useVisitedFeatures';

import type { NextPageWithLayout } from 'src/pages/_app';

const InteractiveRoleEditPage: NextPageWithLayout = () => {
	const { t } = useTranslation('interactiveRolesPage');
	useVisitedFeatures('set', 'interactiveRoles');

	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
			</Head>
			Edit
		</>
	);
};

InteractiveRoleEditPage.Layout = InteractiveRoles;

export default InteractiveRoleEditPage;
