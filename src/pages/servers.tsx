import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';

import { validateCookies } from '@utils/utils';
import type { MutualGuilds } from 'types';

interface IProps {
	guilds: MutualGuilds;
}

const Home: NextPage<IProps> = ({ guilds }: IProps) => {
	console.log(guilds);
	return (
		<>
			<Head>
				<title>Lunaris - Servers</title>
				<meta name='description' content='Website Dashboard for Discord bot - Lunaris' />
			</Head>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ctx => {
	const headers = validateCookies(ctx);
	if (!headers) return { redirect: { destination: '/' }, props: {} };
	try {
		const { data } = await axios.get<MutualGuilds>(`${process.env.API_URL}/guilds`, { headers });

		return { props: { guilds: data, ...(await serverSideTranslations(ctx.locale ?? 'en')) } };
	} catch (err) {
		console.log(err);
		return { redirect: { destination: '/' }, props: {} };
	}
};

export default Home;
