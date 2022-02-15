/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ['en', 'pl'],
		defaultLocale: 'en',
	},
	experimental: {
		styledComponents: true,
	},
};

module.exports = nextConfig;
