import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

import ServersSection from '@views/Servers/ServersSection';
import { validateCookies } from '@utils/utils';

import type { MutualGuilds } from 'types';

interface IProps {
	guilds: MutualGuilds;
}

const Servers: NextPage<IProps> = ({ guilds }: IProps) => {
	const { t } = useTranslation('serversPage');
	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
			</Head>
			<ServersSection guilds={guilds.included} />
			<ServersSection guilds={guilds.excluded} excluded />
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ctx => {
	const headers = validateCookies(ctx);
	if (!headers) return { redirect: { destination: '/' }, props: {} };
	try {
		const { data } = await axios.get<MutualGuilds>(`${process.env.API_URL}/guilds`, { headers });

		return {
			props: {
				guilds: data,
			},
		};
	} catch (err) {
		console.log(err);
		return { redirect: { destination: '/' }, props: {} };
	}
};

export default Servers;
