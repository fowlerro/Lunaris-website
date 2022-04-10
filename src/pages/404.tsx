import { ReactNode } from 'react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from './_app';

const Custom404: NextPageWithLayout = () => {
	return (
		<>
			<Head>
				<title>404 - Page Not Found</title>
			</Head>
			<h1>404 - Page Not Found</h1>
		</>
	);
};

const ErrorLayout = ({ children }: { children: ReactNode }) => {
	return <>{children}</>;
};

Custom404.Layout = ErrorLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en', ['common'])),
		},
	};
};

export default Custom404;
