import React, { ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps as NextAppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import { MediaContextProvider } from '@styles/Media';
import Theme from '@styles/theme';
import { GlobalStyle } from '@styles/GlobalStyle';
import MainLayout from '@layouts/MainLayout';

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
	Layout?: ({ children }: { children: ReactNode }) => JSX.Element;
};

interface AppProps<P = Record<string, never>> extends NextAppProps<P> {
	Component: NextPageWithLayout<P>;
}

function MyApp({ Component, pageProps }: AppProps) {
	const Layout = Component.Layout || EmptyLayout;

	return (
		<Theme>
			<GlobalStyle />
			<MediaContextProvider>
				<MainLayout>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</MainLayout>
			</MediaContextProvider>
		</Theme>
	);
}

const EmptyLayout = ({ children }: { children: ReactNode }) => <>{children}</>;

export default appWithTranslation(MyApp);
