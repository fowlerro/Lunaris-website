import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			primary: string;
			success: string;
			error: string;
			white: string;
			text: {
				secondary: string;
				muted: string;
			};
			background: {
				primary: string;
				secondary: string;
				lighter: string;
				darker: string;
				input: string;
			};
		};
		fonts: string[];
		fontSizes: {
			small: string;
			medium: string;
			large: string;
		};
		breakpoints: {
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xxl: string;
		};
	}
}

const theme: DefaultTheme = {
	colors: {
		primary: '#1956BD',
		success: '#22942D',
		error: '#A10000',
		white: '#E5E5E5',
		text: {
			secondary: '#BDBDBD',
			muted: '#727272',
		},
		background: {
			primary: '#1C1C1C',
			secondary: '#222',
			lighter: '#282828',
			darker: '#151515',
			input: '#333',
		},
	},
	fonts: ['Sora', 'sans-serif'],
	fontSizes: {
		small: '1em',
		medium: '2em',
		large: '3em',
	},
	breakpoints: {
		sm: '0px',
		md: '768px',
		lg: '1024px',
		xl: '1280px',
		xxl: '1536px',
	},
};

const Theme: React.FunctionComponent = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;
