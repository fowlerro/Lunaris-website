/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ['en', 'pl'],
		defaultLocale: 'en',
	},
	env: {
		API_URL: 'http://localhost:3001/api',
	},
	images: {
		domains: ['cdn.discordapp.com'],
	},
};

module.exports = nextConfig;
