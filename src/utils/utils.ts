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
