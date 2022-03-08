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

const colors = {
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
};

let darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#1956BD',
		},
	},
	colors,
	typography: {
		fontFamily: 'Sora, Roboto, Helvetica, Arial, sans-serif',
		h1: {
			fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
			fontWeight: 700,
			fontSize: '4rem',
		},
		h2: {
			fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
			fontWeight: 600,
			fontSize: '3rem',
			letterSpacing: '0.05rem',
		},
		h3: {
			fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
			fontWeight: 600,
			fontSize: '2rem',
			letterSpacing: '0.05rem',
		},
		body1: {
			fontFamily: 'Sora, Roboto, Helvetica, Arial, sans-serif',
			fontWeight: 300,
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
		MuiTextField: {
			styleOverrides: {
				root: {
					'& label': {
						color: colors.text.muted,
					},
					'& .MuiOutlinedInput-root': {
						color: colors.text.primary,
						borderRadius: '8px',
						backgroundColor: colors.background.darker,
					},
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				select: {
					textAlign: 'left',
				},
			},
		},
	},
});

darkTheme = responsiveFontSizes(darkTheme);

export default darkTheme;
