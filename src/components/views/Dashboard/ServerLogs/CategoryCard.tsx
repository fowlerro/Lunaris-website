import { Control, Controller, UseFormRegister } from 'react-hook-form';

import { Autocomplete, Checkbox, FormControlLabel, FormGroup, styled, TextField } from '@mui/material';

import DashboardCard from '@components/DashboardCard';

import type { GuildChannels, GuildLogsPageData, GuildLogTypes } from 'types';

interface IProps {
	category: string;
	channels: GuildChannels;
	logs: {
		[log: string]: boolean;
	};
	register: UseFormRegister<GuildLogsPageData>;
	control: Control<GuildLogsPageData, never>;
}

const StyledCard = styled(DashboardCard)({
	minWidth: '18rem',
	textTransform: 'capitalize',
});

export default function CategoryCard({ category, channels, logs, register, control }: IProps): JSX.Element {
	return (
		<StyledCard header={category} disableIcon>
			<Controller
				name={`serverLogs.${category as keyof GuildLogTypes}.channelId`}
				control={control}
				render={props => (
					<Autocomplete
						disablePortal
						options={channels.text.map(channel => ({ label: channel.name, id: channel.id }))}
						isOptionEqualToValue={(option, value) => option.id === value.id}
						sx={{ textTransform: 'none', marginBlock: '1.5rem' }}
						ListboxProps={{
							style: { textTransform: 'none' },
						}}
						renderInput={params => <TextField {...params} label={'Select channel'} />}
						// eslint-disable-next-line react/prop-types
						onChange={(_, data) => props.field.onChange(data?.id || undefined)}
					/>
				)}
			/>
			<FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
				{Object.entries(logs).map(([log, value]) => (
					<FormControlLabel
						key={log}
						label={log}
						control={<Checkbox defaultChecked={value} {...register(`serverLogs.${category}.logs.${log}` as never)} />}
					/>
				))}
			</FormGroup>
		</StyledCard>
	);
}
