import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

import DashboardLayout from '@layouts/DashboardLayout';
import AutoRoles from '@views/Dashboard/AutoRoles';
import useVisitedFeatures from '@hooks/useVisitedFeatures';
import { validateCookies } from '@utils/utils';

import type { NextPageWithLayout } from 'src/pages/_app';
import type { AutoRolePageData, Role } from 'types';

interface IProps {
	roles: Role[];
	autoRoles: AutoRolePageData;
}

const DashboardAutoRoles: NextPageWithLayout<IProps> = ({ roles, autoRoles }: IProps) => {
	const { t } = useTranslation('autoRolesPage');
	useVisitedFeatures('set', 'autoRoles');
	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
			</Head>
			<AutoRoles roles={roles} autoRolesData={autoRoles} />
		</>
	);
};

DashboardAutoRoles.Layout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async ctx => {
	const guildId = ctx.params?.guildId;
	const headers = validateCookies(ctx);
	if (!headers || !guildId) return { redirect: { destination: '/' }, props: {} };
	try {
		const { data: roles } = await axios.get<Role[]>(`${process.env.API_URL}/guilds/${guildId}/roles`, { headers });
		const { data: autoRoles } = await axios.get<AutoRolePageData>(
			`${process.env.API_URL}/guilds/${guildId}/auto-roles`,
			{ headers }
		);

		return { props: { roles, autoRoles } };
	} catch (err) {
		console.log(err);
		return { redirect: { destination: '/' }, props: {} };
	}
};

export default DashboardAutoRoles;
