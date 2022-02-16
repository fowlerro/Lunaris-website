import React, { ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import 'tailwindcss/tailwind.css';
import { GlobalStyles } from 'twin.macro';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import MainLayout from '@layouts/MainLayout';
import GlobalStyle from '@styles/GlobalStyle';
import { MediaContextProvider } from '@styles/Media';

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
	Layout?: ({ children }: { children: ReactNode }) => JSX.Element;
};

interface AppProps<P = Record<string, never>> extends NextAppProps<P> {
	Component: NextPageWithLayout<P>;
}

function MyApp({ Component, pageProps }: AppProps) {
	const Layout = Component.Layout || EmptyLayout;

	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<GlobalStyles />
			<GlobalStyle />
			<MediaContextProvider>
				<MainLayout>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</MainLayout>
			</MediaContextProvider>
		</>
	);
}

const EmptyLayout = ({ children }: { children: ReactNode }) => <>{children}</>;

export default appWithTranslation(MyApp);
