import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		xxl: true;
	}
	interface Theme {
		colors: {
			primary: {
				main: string;
				'50': string;
				'100': string;
				'200': string;
				'300': string;
				'400': string;
				'500': string;
				'600': string;
				'700': string;
				'800': string;
				'900': string;
			};
			text: {
				primary: string;
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
	}
	interface ThemeOptions {
		colors: {
			primary: {
				main: string;
				'50': string;
				'100': string;
				'200': string;
				'300': string;
				'400': string;
				'500': string;
				'600': string;
				'700': string;
				'800': string;
				'900': string;
			};
			text: {
				primary: string;
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
	}
}

let darkTheme = createTheme({
	palette: {
		primary: {
			main: '#1956BD',
		},
	},
	colors: {
		primary: {
			main: '#1956BD',
			'50': '#87AEEF',
			'100': '#78A3ED',
			'200': '#588EE9',
			'300': '#3979E5',
			'400': '#1D64DD',
			'500': '#1956BD',
			'600': '#144494',
			'700': '#0E316C',
			'800': '#091F43',
			'900': '#040C1B',
		},
		text: {
			primary: '#E5E5E5',
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
	typography: {
		fontFamily: 'Sora, Roboto, Helvetica, Arial, sans-serif',
		h1: {
			fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
			fontWeight: 700,
			fontSize: '4rem',
		},
		subtitle1: {
			fontFamily: 'Sora, Roboto, Helvetica, Arial, sans-serif',
			fontWeight: 300,
			fontSize: '1rem',
			lineHeight: 2,
			letterSpacing: '0.05rem',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
			xxl: 1536,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
				},
			},
		},
	},
});

darkTheme = responsiveFontSizes(darkTheme);

export default darkTheme;
