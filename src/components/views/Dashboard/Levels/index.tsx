import useSWR from 'swr';
import axios from 'axios';
import { SubmitHandler } from 'react-hook-form';

import { styled } from '@mui/material';

import DataSaveToaster from '@components/DataSaveToaster';

import useGuildId from '@hooks/useGuildId';
import { fetcher } from '@utils/utils';

import LevelSettingsCard from './LevelSettingsCard';
import LevelRewardsCard from './LevelRewardsCard';
import useLevelsForm from './useLevelsForm';

import type { GuildChannels, LevelConfigPageData } from 'types';

const Section = styled('section')({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export default function Levels(): JSX.Element {
	const guildId = useGuildId();

	const { data: channels } = useSWR<GuildChannels>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/channels`,
		fetcher
	);
	const { data: levelConfig } = useSWR<LevelConfigPageData>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/levels`,
		fetcher
	);

	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty },
	} = useLevelsForm({ defaultValues: levelConfig, channels });

	const onSubmit: SubmitHandler<LevelConfigPageData> = async levelData => {
		const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/levels`, levelData, {
			withCredentials: true,
		});
		reset(data);
	};
	return (
		<Section>
			<LevelSettingsCard channels={channels} control={control} />
			<LevelRewardsCard control={control} />
			<DataSaveToaster isDataChanged={isDirty} onSave={handleSubmit(onSubmit)} onReset={() => reset()} />
		</Section>
	);
}
