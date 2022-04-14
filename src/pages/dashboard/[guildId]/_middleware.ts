import { NextRequest, NextResponse } from 'next/server';

export const validateMiddlewareCookies = (req: NextRequest) => {
	const sessionId = req.cookies['connect.sid'];
	return sessionId ? { Cookie: `connect.sid=${sessionId}` } : false;
};

export async function middleware(req: NextRequest) {
	const { origin } = req.nextUrl;
	const guildId = req.page.params?.guildId;
	const headers = validateMiddlewareCookies(req);
	if (!guildId || !headers) return NextResponse.redirect(`${origin}/servers`);

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/permissions`, { headers });
	if (response.status !== 200) return NextResponse.redirect(`${origin}/servers`);

	return NextResponse.next();
}
