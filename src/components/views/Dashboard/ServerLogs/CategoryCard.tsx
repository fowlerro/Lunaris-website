import { Control, Controller, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import { Checkbox, FormControlLabel, FormGroup, styled } from '@mui/material';

import DashboardCard from '@components/DashboardCard';
import ChannelSelect from '@components/Inputs/ChannelSelect';

import type { GuildChannels, GuildLogsPageData, GuildLogTypes } from 'types';

interface IProps {
	category: string;
	channels: GuildChannels;
	logs: {
		[log: string]: boolean;
	};
	register: UseFormRegister<GuildLogsPageData>;
	control: Control<GuildLogsPageData>;
}

const StyledCard = styled(DashboardCard)({
	minWidth: '18rem',
	textTransform: 'capitalize',
});

export default function CategoryCard({ category, channels, logs, register, control }: IProps): JSX.Element {
	const { t } = useTranslation('dashboardPage');
	return (
		<StyledCard header={t(`serverLogs.${category}.header`)} disableIcon>
			<Controller
				name={`serverLogs.${category as keyof GuildLogTypes}.channelId`}
				control={control}
				render={({ field }) => <ChannelSelect channels={channels} onChange={field.onChange} />}
			/>
			<FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
				{Object.entries(logs).map(([log, value]) => (
					<FormControlLabel
						key={log}
						label={t(`serverLogs.${category}.${log}`).toString()}
						control={<Checkbox defaultChecked={value} {...register(`serverLogs.${category}.logs.${log}` as never)} />}
					/>
				))}
			</FormGroup>
		</StyledCard>
	);
}
