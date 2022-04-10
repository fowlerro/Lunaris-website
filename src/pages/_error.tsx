import { ReactNode } from 'react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from './_app';

const Error: NextPageWithLayout = () => {
	return (
		<>
			<Head>
				<title>Error</title>
			</Head>
			<h1>Error</h1>
		</>
	);
};

const ErrorLayout = ({ children }: { children: ReactNode }) => {
	return <>{children}</>;
};

Error.Layout = ErrorLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en', ['common'])),
		},
	};
};

export default Error;
