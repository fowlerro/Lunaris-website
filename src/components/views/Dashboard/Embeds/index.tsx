import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import useGuildId from '@hooks/useGuildId';
import { fetcher } from '@utils/utils';

import EmbedList from './EmbedList';
import EmbedCreator from './EmbedCreator';
import EmbedEdit from './EmbedEdit';

import type { EmbedMessage, GuildChannels } from 'types';

const views = ['creator'];

export default function Embeds(): JSX.Element {
	const router = useRouter();
	const guildId = useGuildId();
	const currentView = router.query.view;

	const { data: embeds, isValidating } = useSWR<EmbedMessage[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/embeds`,
		fetcher
	);
	const { data: channels } = useSWR<GuildChannels>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/channels`,
		fetcher
	);

	const editingEmbed = embeds?.find(embed => embed._id === currentView?.[0]);
	useEffect(() => {
		if (!currentView || isValidating) return;
		if (!views.includes(currentView[0]) && !editingEmbed)
			router.push(`/dashboard/${guildId}/embeds`, undefined, { shallow: true });
		if (Array.isArray(currentView) && currentView.length > 1)
			router.push(`/dashboard/${guildId}/embeds/${currentView[0]}`, undefined, { shallow: true });
	}, [currentView, editingEmbed, guildId, router, isValidating]);

	return (
		<>
			{!currentView && <EmbedList channels={channels} embeds={embeds} />}
			{currentView?.[0] === 'creator' && <EmbedCreator channels={channels} />}
			{editingEmbed && currentView?.[0] === editingEmbed._id && <EmbedEdit channels={channels} embed={editingEmbed} />}
		</>
	);
}
