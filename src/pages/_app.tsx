import React, { ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import 'moment/locale/pl';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import MainLayout from '@layouts/MainLayout';
import { MediaContextProvider } from '@styles/Media';

import createEmotionCache from '@utils/createEmotionCache';
import darkTheme from '@styles/theme';
import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/cache';
import { CssBaseline, ThemeProvider } from '@mui/material';
import GlobalStyle from '@styles/GlobalStyle';

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
	Layout?: ({ children }: { children: ReactNode }) => JSX.Element;
};

interface AppProps<P = Record<string, never>> extends NextAppProps<P> {
	Component: NextPageWithLayout<P>;
	emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppProps) {
	const Layout = Component.Layout || EmptyLayout;

	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<MediaContextProvider>
				<CacheProvider value={emotionCache}>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<GlobalStyle />
						<MainLayout>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</MainLayout>
					</ThemeProvider>
				</CacheProvider>
			</MediaContextProvider>
		</>
	);
}

const EmptyLayout = ({ children }: { children: ReactNode }) => <>{children}</>;

export default appWithTranslation(MyApp);
