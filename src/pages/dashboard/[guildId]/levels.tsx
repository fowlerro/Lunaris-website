import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';

import DashboardLayout from '@layouts/DashboardLayout';
import { validateCookies } from '@utils/utils';

import type { NextPageWithLayout } from 'src/pages/_app';
import type { GuildChannels, Role, LevelConfigPageData } from 'types';
import Levels from '@views/Dashboard/Levels';

interface IProps {
	channels: GuildChannels;
	roles: Role[];
	levelConfig: LevelConfigPageData;
}

const DashboardLevels: NextPageWithLayout<IProps> = ({ channels, roles, levelConfig }: IProps) => {
	return (
		<>
			<Head>
				<title>Lunaris - Levels</title>
				<meta name='description' content='Website Dashboard for Discord bot - Lunaris' />
			</Head>
			<Levels channels={channels} roles={roles} levelConfig={levelConfig} />
		</>
	);
};

DashboardLevels.Layout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async ctx => {
	const guildId = ctx.params?.guildId;
	const headers = validateCookies(ctx);
	if (!headers || !guildId) return { redirect: { destination: '/' }, props: {} };
	try {
		const { data: channels } = await axios.get<GuildChannels>(`${process.env.API_URL}/guilds/${guildId}/channels`, {
			headers,
		});
		const { data: roles } = await axios.get<Role[]>(`${process.env.API_URL}/guilds/${guildId}/roles`, {
			headers,
		});
		const { data: levelConfig } = await axios.get<LevelConfigPageData>(
			`${process.env.API_URL}/guilds/${guildId}/levels`,
			{ headers }
		);

		return { props: { channels, roles, levelConfig, ...(await serverSideTranslations(ctx.locale ?? 'en')) } };
	} catch (err) {
		console.log(err);
		return { redirect: { destination: '/' }, props: {} };
	}
};

export default DashboardLevels;
