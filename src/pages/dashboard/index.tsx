import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';

import ProfileSection from '@views/Dashboard/Profile/ProfileSection';
import ServerListSection from '@views/Dashboard/ServerListSection';
import { validateCookies } from '@utils/utils';

import type { ProfileWithRank } from 'types';

interface IProps {
	profile: ProfileWithRank;
}

const Dashboard: NextPage<IProps> = ({ profile }: IProps) => {
	const { t } = useTranslation('pages');
	return (
		<>
			<Head>
				<title>{t('profile.title')}</title>
				<meta name='description' content={t('profile.description')} />
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

export default Dashboard;
