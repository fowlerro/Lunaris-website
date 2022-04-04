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

const values = {
	borderRadius: '8px',
};

export const colors = {
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
		// fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
		h1: {
			fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
			fontWeight: 700,
			fontSize: '5rem',
		},
		h2: {
			fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
			fontWeight: 500,
			fontSize: '3.5rem',
			letterSpacing: '0.05rem',
		},
		h3: {
			fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
			fontWeight: 600,
			fontSize: '2rem',
			letterSpacing: '0.05rem',
		},
		h6: {
			fontSize: '.9rem',
		},
		body1: {
			fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
			fontWeight: 300,
		},
		subtitle1: {
			fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
			fontWeight: 300,
			fontSize: '1rem',
			lineHeight: 2,
			letterSpacing: '0.05rem',
		},
	},
	shape: {
		borderRadius: values.borderRadius,
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
					borderWidth: 2,
					paddingInline: '1.5em',
					color: colors.text.primary,
					'&:hover': {
						borderWidth: 2,
					},
					'&.Mui-disabled': {
						cursor: 'not-allowed',
						pointerEvents: 'unset',
					},
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
						backgroundColor: colors.background.primary,
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
		MuiFormControl: {
			styleOverrides: {
				root: {
					'& label': {
						color: colors.text.muted,
					},
					'& .MuiOutlinedInput-root': {
						borderRadius: '8px',
						backgroundColor: colors.background.primary,
					},
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				root: {
					'& .MuiPaper-root': {
						borderRadius: '8px',
					},
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					borderRadius: '8px',
					marginInline: '1rem',
				},
			},
		},
		MuiTooltip: {
			defaultProps: {
				arrow: true,
				placement: 'top',
			},
			styleOverrides: {
				tooltip: {
					backgroundColor: colors.background.input,
					boxShadow:
						'0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
				},
				arrow: {
					'::before': {
						backgroundColor: colors.background.input,
					},
				},
			},
		},
		MuiTable: {
			styleOverrides: {
				root: {
					backgroundColor: colors.background.lighter,
					borderRadius: '12px',
				},
			},
		},
		MuiListItem: {
			styleOverrides: {
				root: {
					borderRadius: values.borderRadius,
					margin: '0 .5rem',
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					borderRadius: values.borderRadius,
					margin: '0 .5rem',
					'&.Mui-selected': {
						fontWeight: 600,
					},
				},
			},
		},
	},
});

darkTheme = responsiveFontSizes(darkTheme);

export default darkTheme;
