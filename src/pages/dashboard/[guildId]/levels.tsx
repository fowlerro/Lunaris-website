import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

import DashboardLayout from '@layouts/DashboardLayout';
import Levels from '@views/Dashboard/Levels';
import useVisitedFeatures from '@hooks/useVisitedFeatures';
import { validateCookies } from '@utils/utils';

import type { NextPageWithLayout } from 'src/pages/_app';
import type { GuildChannels, Role, LevelConfigPageData } from 'types';

interface IProps {
	channels: GuildChannels;
	roles: Role[];
	levelConfig: LevelConfigPageData;
}

const DashboardLevels: NextPageWithLayout<IProps> = ({ channels, roles, levelConfig }: IProps) => {
	const { t } = useTranslation('levelsPage');
	useVisitedFeatures('set', 'levels');
	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
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

		return { props: { channels, roles, levelConfig } };
	} catch (err) {
		console.log(err);
		return { redirect: { destination: '/' }, props: {} };
	}
};

export default DashboardLevels;
