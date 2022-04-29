import axios from 'axios';

export const fetcher = (url: string) => axios(url, { withCredentials: true }).then(res => res.data);

export const getRoleColor = (color: number) => {
	const roleColor = `#${color ? color.toString(16) : '99AAB5'}`;
	return roleColor;
};

export const getUserAvatar = (userId: string, avatarHash: string | null) => {
	const avatarURL = avatarHash
		? `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.webp`
		: `https://cdn.discordapp.com/embed/avatars/${parseInt(userId.substring(userId.length - 4)) % 5}.png`;

	return avatarURL;
};

export const getUserBanner = (userId: string, bannerHash: string | null) => {
	const extension = bannerHash?.startsWith('a_') ? 'gif' : 'webp';
	const bannerURL = bannerHash ? `https://cdn.discordapp.com/banners/${userId}/${bannerHash}.${extension}` : null;

	return bannerURL;
};

export const getGuildEmojiURL = (emoji: string) => {
	const emojiIdentifier = emoji.substring(1, emoji.length - 1);
	const animated = emojiIdentifier.startsWith('a:');
	const id = emojiIdentifier.split(':').pop();

	const emojiURL = `https://cdn.discordapp.com/emojis/${id}.${animated ? 'gif' : 'png'}`;

	return emojiURL;
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
