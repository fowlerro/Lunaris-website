import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';

import ProfileSection from '@views/Dashboard/Profile/ProfileSection';
import { validateCookies } from '@utils/utils';
import type { ProfileWithRank } from 'types';
import ServerListSection from '@views/Dashboard/ServerListSection';

interface IProps {
	profile: ProfileWithRank;
}

const Home: NextPage<IProps> = ({ profile }: IProps) => {
	return (
		<>
			<Head>
				<title>Lunaris - Profile</title>
				<meta name='description' content='Website Dashboard for Discord bot - Lunaris' />
			</Head>
			<ProfileSection profile={profile} />
			<ServerListSection />
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ctx => {
	const headers = validateCookies(ctx);
	if (!headers) return { redirect: { destination: '/' }, props: {} };
	try {
		const { data } = await axios.get<ProfileWithRank>(`${process.env.API_URL}/profile`, { headers });

		return { props: { profile: data, ...(await serverSideTranslations(ctx.locale ?? 'en')) } };
	} catch (err) {
		console.log(err);
		return { redirect: { destination: '/' }, props: {} };
	}
};

export default Home;
