import { Autocomplete, MenuItem, UseAutocompleteProps } from '@mui/material';
import { useTranslation } from 'next-i18next';

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
	disabledClearable?: boolean;
	onChange: UseAutocompleteProps<ChannelOption, undefined, boolean, undefined>['onChange'];
}

export default function ChannelSelect({ channels, label, disabledClearable = false, onChange }: IProps): JSX.Element {
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
			disableClearable={disabledClearable}
			options={options.sort((a, b) => a.position - b.position)}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			groupBy={option => option.parentId || t('common:noCategory')}
			noOptionsText={t('forms:channelNotFound')}
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
			renderInput={params => <TextField {...params} label={label ?? t('common:channel')} />}
			onChange={onChange}
			sx={{ textTransform: 'none', marginBlock: '1.5rem' }}
			ListboxProps={{
				style: { textTransform: 'none' },
			}}
		/>
	);
}
