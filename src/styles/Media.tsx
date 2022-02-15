import { createMedia } from '@artsy/fresnel';

const MediaApp = createMedia({
	breakpoints: {
		sm: 0,
		md: 768,
		lg: 1024,
	},
});

export const { Media, MediaContextProvider, createMediaStyle } = MediaApp;
