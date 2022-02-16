module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Sora', 'sans-serif'],
		},
		extend: {
			colors: {
				white: '#E5E5E5',
				primary: {
					DEFAULT: '#1956BD',
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
		},
	},
	plugins: [],
};
