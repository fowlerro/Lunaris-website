import { useTranslation } from 'next-i18next';
import { Control, Controller, FieldError } from 'react-hook-form';

import { Autocomplete, TextField } from '@mui/material';

import type { GuildChannels, LevelConfigPageData } from 'types';

interface IProps {
	defaultValue: string;
	channels: GuildChannels;
	control: Control<LevelConfigPageData>;
	error?: FieldError;
}

export default function LevelUpChannel({ defaultValue, channels, control, error }: IProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<Controller
			name={'levelConfig.levelUpMessage.channelId'}
			defaultValue={defaultValue}
			control={control}
			render={props => (
				<Autocomplete
					disablePortal
					options={channels.text.map(channel => ({ label: channel.name, id: channel.id }))}
					isOptionEqualToValue={(option, value) => option.id === value.id}
					sx={{ textTransform: 'none' }}
					ListboxProps={{
						style: { textTransform: 'none' },
					}}
					renderOption={(props, { label, id }) => (
						<li {...props} key={id}>
							{label}
						</li>
					)}
					renderInput={params => (
						<TextField
							{...params}
							margin='normal'
							label={t('common:channel')}
							error={!!error}
							helperText={error?.message}
						/>
					)}
					defaultValue={{
						id: defaultValue,
						label: channels.text.find(channel => channel.id === defaultValue)?.name || '',
					}}
					// eslint-disable-next-line react/prop-types
					onChange={(_, data) => props.field.onChange(data?.id || '')}
				/>
			)}
		/>
	);
}
