import { ReactNode } from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import { Typography, Box, Button } from '@mui/material';

import Link from '@components/Link';

import type { NextPageWithLayout } from './_app';

const Custom404Page: NextPageWithLayout = () => {
	const { t } = useTranslation('common');
	return (
		<>
			<Head>
				<title>404 - {t('pageNotFound')}</title>
			</Head>
			<Box sx={{ marginLeft: '10%', display: 'grid', placeItems: 'flex-start' }}>
				<Typography variant='h3' component='h1' sx={{ marginTop: '20%' }} gutterBottom>
					404 - {t('pageNotFound')}
				</Typography>
				<Button variant='contained' href='/' LinkComponent={Link}>
					{t('layout:nav.home')}
				</Button>
			</Box>
		</>
	);
};

const ErrorLayout = ({ children }: { children: ReactNode }) => {
	return <>{children}</>;
};

Custom404Page.Layout = ErrorLayout;

export default Custom404Page;
