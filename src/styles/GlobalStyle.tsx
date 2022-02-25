import { css } from '@emotion/react';
import { GlobalStyles } from '@mui/material';
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

	h2 {
		font-weight: 600;
		color: ${theme.colors.text.primary};
		font-size: 2.25rem;
	}

	h3 {
		font-weight: 600;
		color: ${theme.colors.text.primary};
		font-size: 1.5rem;
	}

	h5 {
		font-weight: 600;
		color: ${theme.colors.text.primary};
		font-size: 1.125rem;
	}

	h6 {
		font-weight: 600;
		color: ${theme.colors.text.primary};
		font-size: 1rem;
	}

	p {
		font-weight: 300;
		color: ${theme.colors.text.secondary};
		letter-spacing: 0.05em;
	}

	@media (min-width: ${theme.breakpoints.up('md')}) {
		h1 {
			font-size: 3.75rem;
		}
	}
`;

const GlobalStyle = () => <GlobalStyles styles={globalCss} />;
export default GlobalStyle;
