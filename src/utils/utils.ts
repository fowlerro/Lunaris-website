import { GetServerSidePropsContext } from 'next';
import axios from 'axios';

export const fetcher = (url: string) => axios(url, { withCredentials: true });

export const validateCookies = (ctx: GetServerSidePropsContext) => {
	const sessionId = ctx.req.cookies['connect.sid'];
	return sessionId ? { Cookie: `connect.sid=${sessionId}` } : false;
};

export const getRoleColor = (color: number) => {
	const roleColor = `#${color ? color.toString(16) : '99AAB5'}`;
	return roleColor;
};

export const EMBED_LIMITS = {
	messageContent: 2000,
	author: 256,
	description: 4096,
	title: 256,
	field: {
		amount: 25,
		name: 256,
		value: 1024,
	},
	footer: 2048,
};
