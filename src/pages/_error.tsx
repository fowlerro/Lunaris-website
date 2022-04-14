import { ReactNode } from 'react';
import Head from 'next/head';

import type { NextPageWithLayout } from './_app';

const ErrorPage: NextPageWithLayout = () => {
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

ErrorPage.Layout = ErrorLayout;

export default ErrorPage;
