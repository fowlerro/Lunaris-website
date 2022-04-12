import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

import DashboardLayout from '@layouts/DashboardLayout';
import ServerLogs from '@views/Dashboard/ServerLogs';

import useVisitedFeatures from '@hooks/useVisitedFeatures';
import { validateCookies } from '@utils/utils';

import type { NextPageWithLayout } from 'src/pages/_app';
import type { GuildLogsPageData, GuildChannels } from 'types';

interface IProps {
	channels: GuildChannels;
	guildLogs: GuildLogsPageData;
}

const DashboardServerLogs: NextPageWithLayout<IProps> = ({ channels, guildLogs }: IProps) => {
	const { t } = useTranslation('serverLogsPage');
	useVisitedFeatures('set', 'serverLogs');
	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
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

		return { props: { channels, guildLogs } };
	} catch (err) {
		console.log(err);
		return { redirect: { destination: '/' }, props: {} };
	}
};

export default DashboardServerLogs;
