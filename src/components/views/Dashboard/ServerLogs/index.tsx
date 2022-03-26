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

	const {
		register,
		handleSubmit,
		control,
		formState: { dirtyFields },
		reset,
	} = useForm<GuildLogsPageData>({
		defaultValues: guildLogs,
		reValidateMode: 'onSubmit',
	});

	const onSubmit: SubmitHandler<GuildLogsPageData> = async guildLogsData => {
		console.log(guildLogsData);
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
					register={register}
					control={control}
				/>
			))}
			<DataSaveToaster isDataChanged={!!Object.keys(dirtyFields).length} onSave={handleSubmit(onSubmit)} />
		</Section>
	);
}
