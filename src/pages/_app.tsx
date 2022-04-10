import React, { ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/cache';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import MainLayout from '@layouts/MainLayout';
import darkTheme from '@styles/theme';
import GlobalStyle from '@styles/GlobalStyle';
import createEmotionCache from '@utils/createEmotionCache';

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
	Layout?: ({ children }: { children: ReactNode }) => JSX.Element;
};

interface AppProps<P = Record<string, never>> extends NextAppProps<P> {
	Component: NextPageWithLayout<P>;
	emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppProps) {
	const Layout = Component.Layout || MainLayout;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<GlobalStyle />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</LocalizationProvider>
		</CacheProvider>
	);
}

export default appWithTranslation(MyApp);
