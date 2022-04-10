// /** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');

const nextConfig = {
	reactStrictMode: true,
	i18n,
	env: {
		API_URL: 'http://api.lunaris.pro/api',
		INVITE_URL:
			'https://discord.com/api/oauth2/authorize?client_id=739412828737372181&permissions=8&redirect_uri=http%3A%2F%2F192.168.0.103%3A3000%2Fapi%2Finvite%2Fredirect&response_type=code&scope=identify%20bot%20applications.commands',
	},
	images: {
		domains: ['cdn.discordapp.com'],
	},
};

module.exports = nextConfig;
