import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';

import BanTable from '@views/Dashboard/Overview/Bans/BanTable';
import WarnTable from '@views/Dashboard/Overview/Warns/WarnTable';

import DashboardLayout from '@layouts/DashboardLayout';
import { validateCookies } from '@utils/utils';

import type { NextPageWithLayout } from 'src/pages/_app';
import type { Ban, WarnedUser } from 'types';

interface IProps {
	bans: Ban[];
	warns: WarnedUser[];
}

const DashboardOverview: NextPageWithLayout<IProps> = ({ bans, warns }: IProps) => {
	console.log(warns);
	return (
		<>
			<Head>
				<title>Lunaris - Overview</title>
				<meta name='description' content='Website Dashboard for Discord bot - Lunaris' />
			</Head>
			{bans && bans.length && <BanTable bans={bans} />}
			{warns && warns.length && <WarnTable warnedUsers={warns} />}
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
