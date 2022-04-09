import { Control, Controller } from 'react-hook-form';

import ChannelSelect from '@components/Inputs/ChannelSelect';

import type { GuildChannels, LevelConfigPageData } from 'types';

interface IProps {
	channels: GuildChannels;
	control: Control<LevelConfigPageData>;
}

export default function LevelUpChannel({ channels, control }: IProps): JSX.Element {
	return (
		<Controller
			name={'levelConfig.levelUpMessage.channelId'}
			control={control}
			render={({ field, fieldState }) => (
				<ChannelSelect
					channels={channels}
					value={field.value}
					onChange={e => field.onChange(e)}
					error={fieldState.invalid}
					helperText={fieldState.error?.message}
				/>
			)}
		/>
	);
}
