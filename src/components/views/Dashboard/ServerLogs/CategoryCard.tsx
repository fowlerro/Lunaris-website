import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import { Checkbox, FormControlLabel, FormGroup, styled } from '@mui/material';

import DashboardCard from '@components/DashboardCard';
import ChannelSelect from '@components/Inputs/ChannelSelect';

import type { GuildChannels, GuildLogsPageData, GuildLogTypes } from '@types';

interface IProps {
	category: string;
	channels: GuildChannels;
	logs: {
		[log: string]: boolean;
	};
	control: Control<GuildLogsPageData>;
}

const StyledCard = styled(DashboardCard)({
	textTransform: 'capitalize',
	flex: 1,
});

export default function CategoryCard({ category, channels, logs, control }: IProps): JSX.Element {
	const { t } = useTranslation('dashboardPage');
	return (
		<StyledCard header={t(`serverLogs.${category}.header`)} disableIcon>
			<Controller
				name={`serverLogs.${category as keyof GuildLogTypes}.channelId`}
				control={control}
				render={({ field }) => (
					<ChannelSelect channels={channels} value={field.value ?? null} onChange={field.onChange} size='small' />
				)}
			/>
			<FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
				{Object.keys(logs).map(log => (
					<FormControlLabel
						key={log}
						label={t(`serverLogs.${category}.${log}`).toString()}
						componentsProps={{
							typography: {
								variant: 'body2',
							},
						}}
						control={
							<Controller
								name={`serverLogs.${category}.logs.${log}` as never}
								control={control}
								render={({ field: { value, ...field } }) => <Checkbox {...field} checked={!!value} size='small' />}
							/>
						}
					/>
				))}
			</FormGroup>
		</StyledCard>
	);
}
