export const LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/discord`;
export const INVITE_URL = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&permissions=8&redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}%2Fapi%2Finvite%2Fredirect&response_type=code&scope=identify%20bot%20applications.commands`;
export const SUPPORT_INVITE_URL = 'https://discord.gg/VVdGJWypGe';
