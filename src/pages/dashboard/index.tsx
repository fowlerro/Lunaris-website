import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import axios from 'axios';

import ProfileSection from '@views/Dashboard/Profile/ProfileSection';
import ServerListSection from '@views/Dashboard/ServerListSection';
import { validateCookies } from '@utils/utils';

import type { ProfileWithRank } from 'types';

interface IProps {
	profile: ProfileWithRank;
}

const Dashboard: NextPage<IProps> = ({ profile }: IProps) => {
	const { t } = useTranslation('profilePage');
	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
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

		return { props: { profile: data } };
	} catch (err) {
		console.log(err);
		return { redirect: { destination: '/' }, props: {} };
	}
};

export default Dashboard;
