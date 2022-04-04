import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';

import Embeds from '@views/Dashboard/Embeds';
import DashboardLayout from '@layouts/DashboardLayout';
import { validateCookies } from '@utils/utils';

import type { NextPageWithLayout } from 'src/pages/_app';
import type { GuildChannels, EmbedMessage } from 'types';
import { useTranslation } from 'next-i18next';

interface IProps {
	channels: GuildChannels;
	embeds: EmbedMessage[];
}

const DashboardEmbeds: NextPageWithLayout<IProps> = ({ channels, embeds }: IProps) => {
	const { t } = useTranslation('pages');
	return (
		<>
			<Head>
				<title>{t('embeds.title')}</title>
				<meta name='description' content={t('embeds.description')} />
			</Head>
			<Embeds channels={channels} embeds={embeds} />
		</>
	);
};

DashboardEmbeds.Layout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async ctx => {
	const guildId = ctx.params?.guildId;
	const headers = validateCookies(ctx);
	if (!headers || !guildId) return { redirect: { destination: '/' }, props: {} };
	try {
		const { data: channels } = await axios.get<GuildChannels>(`${process.env.API_URL}/guilds/${guildId}/channels`, {
			headers,
		});
		const { data: embeds } = await axios.get<EmbedMessage[]>(`${process.env.API_URL}/guilds/${guildId}/embeds`, {
			headers,
		});

		return { props: { channels, embeds, ...(await serverSideTranslations(ctx.locale ?? 'en')) } };
	} catch (err) {
		console.log(err);
		return { redirect: { destination: '/' }, props: {} };
	}
};

export default DashboardEmbeds;
