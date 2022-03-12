import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

export const fetcher = (url: string) => axios(url, { withCredentials: true });

export const validateCookies = (ctx: GetServerSidePropsContext) => {
	const sessionId = ctx.req.cookies['connect.sid'];
	return sessionId ? { Cookie: `connect.sid=${sessionId}` } : false;
};
