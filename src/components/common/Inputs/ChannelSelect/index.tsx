import { Autocomplete, MenuItem, TextFieldProps } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';

import TextField from '../TextField';

import type { GuildChannels } from 'types';

type ChannelOption = {
	id: string;
	label: string;
	parentId: string | null;
	position: number;
};

interface IProps {
	channels: GuildChannels;
	label?: string;
	value?: string | null;
	disabled?: boolean;
	disabledClearable?: boolean;
	size?: TextFieldProps['size'];
	error?: boolean;
	helperText?: string;
	onChange: (value: string | undefined) => void;
}

export default function ChannelSelect({
	channels,
	label,
	value,
	disabled = false,
	disabledClearable = false,
	size = 'medium',
	error = false,
	helperText,
	onChange,
}: IProps): JSX.Element {
	const { t } = useTranslation();

	const options: ChannelOption[] = channels.text.map(channel => ({
		id: channel.id,
		label: channel.name,
		parentId: channel.parentId,
		position: channel.rawPosition,
	}));

	return (
		<Autocomplete
			disablePortal
			disabled={disabled}
			disableClearable={disabledClearable}
			options={options.sort((a, b) => a.position - b.position)}
			isOptionEqualToValue={(option, value) => option.id === value?.id}
			groupBy={option => option.parentId || t('common:noCategory')}
			noOptionsText={t('forms:channelNotFound')}
			value={value ? options.find(option => option.id === value) : null}
			renderGroup={params => {
				return (
					<div style={{ marginBottom: '1rem' }} key={params.key}>
						<MenuItem sx={{ textTransform: 'uppercase', fontSize: '.9rem' }} disabled>
							{channels.category.find(channel => channel.id === params.group)?.name || params.group}
						</MenuItem>
						{params.children}
					</div>
				);
			}}
			renderOption={(props, channel) => <MenuItem {...props}>{channel.label}</MenuItem>}
			renderInput={params => (
				<TextField {...params} size={size} label={label ?? t('common:channel')} error={error} helperText={helperText} />
			)}
			onChange={(_, value) => onChange(value?.id)}
			sx={{ textTransform: 'none', marginBlock: '1.5rem' }}
			ListboxProps={{
				style: { textTransform: 'none' },
			}}
		/>
	);
}
