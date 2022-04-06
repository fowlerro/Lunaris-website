import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';

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
	const { t } = useTranslation('pages');
	useVisitedFeatures('set', 'levels');
	return (
		<>
			<Head>
				<title>{t('levels.title')}</title>
				<meta name='description' content={t('levels.description')} />
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
