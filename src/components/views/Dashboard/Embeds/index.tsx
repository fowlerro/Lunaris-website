import { useEffect } from 'react';
import { useRouter } from 'next/router';

import EmbedList from './EmbedList';
import EmbedCreator from './EmbedCreator';
import EmbedEdit from './EmbedEdit';

import type { EmbedMessage, GuildChannels } from 'types';

interface IProps {
	channels: GuildChannels;
	embeds: EmbedMessage[];
}

const views = ['creator'];

export default function Embeds({ channels, embeds }: IProps): JSX.Element {
	const router = useRouter();
	const guildId = router.query.guildId as string;
	const currentView = router.query.view;
	const editingEmbed = embeds.find(embed => embed._id === currentView?.[0]);
	useEffect(() => {
		if (!currentView) return;
		if (!views.includes(currentView[0]) && !editingEmbed)
			router.push(`/dashboard/${guildId}/embeds`, undefined, { shallow: true });
		if (Array.isArray(currentView) && currentView.length > 1)
			router.push(`/dashboard/${guildId}/embeds/${currentView[0]}`, undefined, { shallow: true });
	}, [currentView, editingEmbed, guildId, router]);

	return (
		<>
			{!currentView && <EmbedList channels={channels} embeds={embeds} />}
			{currentView?.[0] === 'creator' && <EmbedCreator channels={channels} />}
			{editingEmbed && currentView?.[0] === editingEmbed._id && <EmbedEdit channels={channels} embed={editingEmbed} />}
		</>
	);
}
