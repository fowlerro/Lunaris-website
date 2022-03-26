import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';

import DashboardLayout from '@layouts/DashboardLayout';
import { validateCookies } from '@utils/utils';

import type { NextPageWithLayout } from 'src/pages/_app';
import type { GuildLogsPageData, GuildChannels } from 'types';
import ServerLogs from '@views/Dashboard/ServerLogs';

interface IProps {
	channels: GuildChannels;
	guildLogs: GuildLogsPageData;
}

const DashboardServerLogs: NextPageWithLayout<IProps> = ({ channels, guildLogs }: IProps) => {
	return (
		<>
			<Head>
				<title>Lunaris - Server Logs</title>
				<meta name='description' content='Website Dashboard for Discord bot - Lunaris' />
			</Head>
			<ServerLogs channels={channels} guildLogs={guildLogs} />
		</>
	);
};

DashboardServerLogs.Layout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async ctx => {
	const guildId = ctx.params?.guildId;
	const headers = validateCookies(ctx);
	if (!headers || !guildId) return { redirect: { destination: '/' }, props: {} };
	try {
		const { data: channels } = await axios.get<GuildChannels>(`${process.env.API_URL}/guilds/${guildId}/channels`, {
			headers,
		});
		const { data: guildLogs } = await axios.get<GuildLogsPageData>(
			`${process.env.API_URL}/guilds/${guildId}/server-logs`,
			{ headers }
		);

		return { props: { channels, guildLogs, ...(await serverSideTranslations(ctx.locale ?? 'en')) } };
	} catch (err) {
		console.log(err);
		return { redirect: { destination: '/' }, props: {} };
	}
};

export default DashboardServerLogs;
