import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

import DashboardLayout from '@layouts/DashboardLayout';
import { validateCookies } from '@utils/utils';

import type { NextPageWithLayout } from 'src/pages/_app';
import type { Ban, WarnedUser } from 'types';

interface IProps {
	bans: Ban[];
	warns: WarnedUser[];
}

const DashboardOverview: NextPageWithLayout<IProps> = ({ bans, warns }: IProps) => {
	const { t } = useTranslation('dashboardPage');
	console.log({ bans, warns });
	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
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

		return { props: { bans, warns } };
	} catch (err) {
		console.log(err);
		return { redirect: { destination: '/' }, props: {} };
	}
};

export default DashboardOverview;
