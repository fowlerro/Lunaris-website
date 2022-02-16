import { Global, css } from '@emotion/react';
import theme from './theme';

const globalCss = css`
	html {
		box-sizing: border-box;
		scroll-behavior: smooth;
	}

	html,
	body {
		margin: 0;
		font-family: 'Sora', sans-serif;
		color: ${theme.colors.white};
		background: ${theme.colors.background.primary};
	}

	*,
	*::before,
	*::after {
		box-sizing: inherit;
	}
`;

const GlobalStyle = () => <Global styles={globalCss} />;
export default GlobalStyle;
