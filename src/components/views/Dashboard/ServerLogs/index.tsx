import { useRouter } from 'next/router';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';

import { styled } from '@mui/material';

import DataSaveToaster from '@components/DataSaveToaster';

import CategoryCard from './CategoryCard';

import type { GuildChannels, GuildLogsPageData } from 'types';

interface IProps {
	channels: GuildChannels;
	guildLogs: GuildLogsPageData;
}

const Section = styled('section')({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',
});

export default function ServerLogs({ channels, guildLogs }: IProps): JSX.Element {
	const router = useRouter();
	const guildId = router.query.guildId;

	const defaultValues: GuildLogsPageData = {
		status: guildLogs.status,
		serverLogs: {
			channels: {
				channelId: guildLogs.serverLogs.channels.channelId ?? '',
				logs: guildLogs.serverLogs.channels.logs,
			},
			emojis: {
				channelId: guildLogs.serverLogs.emojis.channelId ?? '',
				logs: guildLogs.serverLogs.emojis.logs,
			},
			messages: {
				channelId: guildLogs.serverLogs.messages.channelId ?? '',
				logs: guildLogs.serverLogs.messages.logs,
			},
			invites: {
				channelId: guildLogs.serverLogs.invites.channelId ?? '',
				logs: guildLogs.serverLogs.invites.logs,
			},
			roles: {
				channelId: guildLogs.serverLogs.roles.channelId ?? '',
				logs: guildLogs.serverLogs.roles.logs,
			},
			members: {
				channelId: guildLogs.serverLogs.members.channelId ?? '',
				logs: guildLogs.serverLogs.members.logs,
			},
			server: {
				channelId: guildLogs.serverLogs.server.channelId ?? '',
				logs: guildLogs.serverLogs.server.logs,
			},
			threads: {
				channelId: guildLogs.serverLogs.threads.channelId ?? '',
				logs: guildLogs.serverLogs.threads.logs,
			},
		},
	};

	const {
		handleSubmit,
		control,
		formState: { dirtyFields },
		reset,
	} = useForm<GuildLogsPageData>({
		defaultValues,
		reValidateMode: 'onSubmit',
	});

	const isDirty = Boolean(Object.keys(dirtyFields).length);

	const onSubmit: SubmitHandler<GuildLogsPageData> = async guildLogsData => {
		await axios.put(`${process.env.API_URL}/guilds/${guildId}/server-logs`, guildLogsData, {
			withCredentials: true,
		});
		reset(guildLogsData);
	};

	return (
		<Section>
			{/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
			{Object.entries(guildLogs.serverLogs!).map(([category, logs]) => (
				<CategoryCard
					key={category}
					category={category}
					channels={channels}
					logs={logs.logs as { [log: string]: boolean }}
					control={control}
				/>
			))}
			<DataSaveToaster isDataChanged={isDirty} onSave={handleSubmit(onSubmit)} onReset={reset} />
		</Section>
	);
}
