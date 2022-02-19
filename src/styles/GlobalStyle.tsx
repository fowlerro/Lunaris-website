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

	h1 {
		color: ${theme.colors.white};
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		font-weight: 700;
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

	h5 {
		font-weight: 600;
		color: ${theme.colors.white};
		font-size: 1.125rem;
	}

	p {
		font-weight: 300;
		color: ${theme.colors.text.secondary};
		letter-spacing: 0.05em;
	}

	@media (min-width: ${theme.breakpoints.md}) {
		h1 {
			font-size: 3.75rem;
		}
	}
`;

const GlobalStyle = () => <Global styles={globalCss} />;
export default GlobalStyle;
