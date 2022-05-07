import useSWR from 'swr';
import axios from 'axios';
import { SubmitHandler } from 'react-hook-form';

import { styled } from '@mui/material';

import DataSaveToaster from '@components/DataSaveToaster';
import DashboardCard from '@components/DashboardCard';
import Explanation from '@components/Explanation';
import ControlledSwitch from '@components/Inputs/Controlled/ControlledSwitch';

import useGuildId from '@hooks/useGuildId';
import { fetcher } from '@utils/utils';

import CategoryCard from './CategoryCard';
import useServerLogsForm from './useServerLogsForm';

import type { GuildChannels, GuildLogsPageData } from 'types';
import useTranslation from 'next-translate/useTranslation';

const Section = styled('section')({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',
});

export default function ServerLogs(): JSX.Element {
	const guildId = useGuildId();
	const { t } = useTranslation();

	const { data: channels } = useSWR<GuildChannels>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/channels`,
		fetcher
	);
	const { data: serverLogs } = useSWR<GuildLogsPageData>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/server-logs`,
		fetcher
	);

	const {
		control,
		handleSubmit,
		reset,
		formState: { dirtyFields },
	} = useServerLogsForm({ defaultValues: serverLogs });

	const isDirty = Boolean(Object.keys(dirtyFields).length);

	const onSubmit: SubmitHandler<GuildLogsPageData> = async guildLogsData => {
		await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/server-logs`, guildLogsData, {
			withCredentials: true,
		});
		reset(guildLogsData);
	};

	return (
		<Section>
			<DashboardCard
				header={t('layout:dashboardSidebar.serverLogs')}
				action={
					<Explanation label={t('common:toggleModule')}>
						<ControlledSwitch name='status' control={control} />
					</Explanation>
				}
				sx={{ flex: '1 1 100%' }}
			>
				<></>
			</DashboardCard>
			{serverLogs
				? Object.entries(serverLogs.serverLogs).map(([category, logs]) => (
						<CategoryCard
							key={category}
							category={category}
							channels={channels}
							logs={logs.logs as { [log: string]: boolean }}
							control={control}
						/>
				  ))
				: null}
			<DataSaveToaster isDataChanged={isDirty} onSave={handleSubmit(onSubmit)} onReset={reset} />
		</Section>
	);
}
