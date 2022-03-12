import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const guildId = req.query?.guild_id;

	return res.redirect(guildId ? `/dashboard/${guildId}` : '/servers');
}
