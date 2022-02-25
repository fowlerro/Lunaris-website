import Document, { Html, Main, NextScript, Head } from 'next/document';

import theme from '@styles/theme';
import createEmotionCache from '@utils/createEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';
// MUI Emotion Cache SSR from example below
// https://github.com/mui/material-ui/blob/e2892a61ea56b6578c2efc81d0324660082ad93c/examples/nextjs-with-typescript/pages/_document.tsx

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta name='theme-color' content={theme.colors.primary.main} />
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link rel='preconnect' href='https://fonts.gstatic.com' />
					<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
					<link
						href='https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;600;700&display=swap'
						rel='stylesheet'
					/>
					{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
					{(this.props as any).emotionStyleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async ctx => {
	const originalRenderPage = ctx.renderPage;

	const cache = createEmotionCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	ctx.renderPage = () =>
		originalRenderPage({
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			enhanceApp: (App: any) =>
				function EnhanceApp(props) {
					return <App emotionCache={cache} {...props} />;
				},
		});

	const initialProps = await Document.getInitialProps(ctx);
	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map(style => (
		<style
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			key={style.key}
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	));

	return {
		...initialProps,
		emotionStyleTags,
	};
};
