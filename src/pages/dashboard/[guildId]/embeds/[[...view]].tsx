import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

import Embeds from '@views/Dashboard/Embeds';
import DashboardLayout from '@layouts/DashboardLayout';
import useVisitedFeatures from '@hooks/useVisitedFeatures';
import { validateCookies } from '@utils/utils';

import type { NextPageWithLayout } from 'src/pages/_app';
import type { GuildChannels, EmbedMessage } from 'types';

interface IProps {
	channels: GuildChannels;
	embeds: EmbedMessage[];
}

const DashboardEmbeds: NextPageWithLayout<IProps> = ({ channels, embeds }: IProps) => {
	const { t } = useTranslation('embedsPage');
	useVisitedFeatures('set', 'embedMessages');

	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
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

		return { props: { channels, embeds } };
	} catch (err) {
		console.log(err);
		return { redirect: { destination: '/' }, props: {} };
	}
};

export default DashboardEmbeds;
