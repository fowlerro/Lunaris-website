import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';

import CreatorView from './CreatorView';
import EmbedCreator from '@views/Dashboard/Embeds/EmbedCreator';

import useInteractiveRolesForm, { InteractiveRolesFormValues } from '../../utils/useInteractiveRolesForm';

import { fetcher } from '@utils/utils';
import useLeaveWithChanges from '@hooks/useLeaveWithChanges';

import type { GuildChannels, Role, EmbedMessage } from 'types';

export default function InteractiveRolesCreator(): JSX.Element {
	const { t } = useTranslation('interactiveRolesPage');
	const router = useRouter();
	const guildId = router.query.guildId as string;
	const view = router.query.view;

	useEffect(() => {
		if (!view) return;
		if (Array.isArray(view) && view.length > 1) router.replace(`/dashboard/${guildId}/interactive-roles/creator/embed`);
		if (Array.isArray(view) && view[0] !== 'embed') router.replace(`/dashboard/${guildId}/interactive-roles/creator`);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [view]);

	const { data: channels } = useSWR<GuildChannels>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/channels`,
		fetcher,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnMount: false,
			revalidateOnReconnect: false,
		}
	);
	const { data: roles } = useSWR<Role[]>(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/roles`, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnMount: false,
		revalidateOnReconnect: false,
	});

	const defaultValues: InteractiveRolesFormValues = {
		name: t('creator.defaultName', { default: 'New Interactive Role' }),
		guildId: '',
		channelId: '',
		messageId: '',
		embedId: '',
		type: 'reactions',
		placeholder: '',
		roles: [],
	};

	const form = useInteractiveRolesForm({
		defaultValues,
		channels,
		roles,
	});

	useLeaveWithChanges(form.formState.isDirty);

	const handleEmbedSave = async (embed: EmbedMessage) => {
		await router.push(`/dashboard/${guildId}/interactive-roles/creator`, undefined, { shallow: true });
		if (!embed._id || !embed.channelId) return;
		form.setValue('embedId', embed._id);
		form.setValue('channelId', embed.channelId);
	};

	if (!view) return <CreatorView form={form} channels={channels} />;
	if (view[0] === 'embed')
		return (
			<EmbedCreator
				channels={channels}
				backUrl={`/dashboard/${guildId}/interactive-roles/creator`}
				onEmbedSave={handleEmbedSave}
			/>
		);
	return <>Error</>;
}
