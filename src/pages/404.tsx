import { ReactNode } from 'react';
import Head from 'next/head';

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

export default Custom404;
