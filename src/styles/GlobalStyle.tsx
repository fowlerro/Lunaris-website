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

	h2 {
		font-weight: 600;
		color: ${theme.colors.white};
		font-size: 2.25rem;
	}

	h3 {
		font-weight: 600;
		color: ${theme.colors.white};
		font-size: 1.5rem;
	}

	p {
		font-weight: 400;
		color: ${theme.colors.text.secondary};
	}
`;

const GlobalStyle = () => <Global styles={globalCss} />;
export default GlobalStyle;
