import React from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import { MediaContextProvider } from '@styles/Media';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MediaContextProvider>
			<Component {...pageProps} />
		</MediaContextProvider>
	);
}

export default appWithTranslation(MyApp);
