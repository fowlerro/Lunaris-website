/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ['en', 'pl'],
		defaultLocale: 'en',
	},
	env: {
		apiDomain: 'http://localhost:3001',
	},
};

module.exports = nextConfig;
