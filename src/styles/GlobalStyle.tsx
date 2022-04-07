import { css } from '@emotion/react';
import { GlobalStyles } from '@mui/material';
import theme from './theme';

const globalCss = css`
	:root {
		color-scheme: dark;
	}

	html {
		box-sizing: border-box;
		scroll-behavior: smooth;
	}

	html,
	body {
		margin: 0;
		min-height: 100vh;
		color: ${theme.colors.text.primary};
		background: ${theme.colors.background.primary};
	}

	*,
	*::before,
	*::after {
		box-sizing: inherit;
	}

	a {
		color: ${theme.colors.text.primary};
	}

	.active {
		opacity: 1;
	}
`;

const GlobalStyle = () => <GlobalStyles styles={globalCss} />;
export default GlobalStyle;
