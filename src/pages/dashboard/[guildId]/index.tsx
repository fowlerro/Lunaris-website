import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';

import DashboardLayout from '@layouts/DashboardLayout';
import { validateCookies } from '@utils/utils';

import type { NextPageWithLayout } from 'src/pages/_app';
import type { Ban, WarnedUser } from 'types';

interface IProps {
	bans: Ban[];
	warns: WarnedUser[];
}

const DashboardOverview: NextPageWithLayout<IProps> = ({ bans, warns }: IProps) => {
	const { t } = useTranslation('pages');
	console.log({ bans, warns });
	return (
		<>
			<Head>
				<title>{t('overview.title')}</title>
				<meta name='description' content={t('overview.description')} />
			</Head>
		</>
	);
};

DashboardOverview.Layout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async ctx => {
	const guildId = ctx.params?.guildId;
	const headers = validateCookies(ctx);
	if (!headers || !guildId) return { redirect: { destination: '/' }, props: {} };
	try {
		const { data: bans } = await axios.get<Ban[]>(`${process.env.API_URL}/guilds/${guildId}/bans`, { headers });
		const { data: warns } = await axios.get<WarnedUser[]>(`${process.env.API_URL}/guilds/${guildId}/warns`, {
			headers,
		});

		return { props: { bans, warns, ...(await serverSideTranslations(ctx.locale ?? 'en')) } };
	} catch (err) {
		console.log(err);
		return { redirect: { destination: '/' }, props: {} };
	}
};

export default DashboardOverview;
