import { ReactNode } from 'react';

import type { NextPageWithLayout } from './_app';

const ErrorPage: NextPageWithLayout = () => {
	return null;
};

const ErrorLayout = ({ children }: { children: ReactNode }) => {
	return <>{children}</>;
};

ErrorPage.Layout = ErrorLayout;

export const getServerSideProps = () => {
	return {
		redirect: {
			destination: '/',
			permanent: true,
		},
	};
};

export default ErrorPage;
