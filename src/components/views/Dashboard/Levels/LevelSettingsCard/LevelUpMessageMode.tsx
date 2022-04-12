import useTranslation from 'next-translate/useTranslation';
import { Control, Controller } from 'react-hook-form';

import Select from '@components/Inputs/Select';

import type { LevelConfigPageData } from 'types';

interface IProps {
	control: Control<LevelConfigPageData>;
}

export default function LevelUpMessageMode({ control }: IProps): JSX.Element {
	const { t } = useTranslation();
	const levelUpChannelOptions = [
		{
			value: 'currentChannel',
			label: t('levelsPage:levelUpMessage.mode.currentChannel.label'),
			description: t('levelsPage:levelUpMessage.mode.currentChannel.description'),
		},
		{
			value: 'specificChannel',
			label: t('levelsPage:levelUpMessage.mode.specificChannel.label'),
			description: t('levelsPage:levelUpMessage.mode.specificChannel.description'),
		},
		{
			value: 'off',
			label: t('levelsPage:levelUpMessage.mode.off.label'),
			description: t('levelsPage:levelUpMessage.mode.off.description'),
		},
	];
	return (
		<Controller
			name={'levelConfig.levelUpMessage.mode'}
			control={control}
			render={({ field, fieldState }) => (
				<Select
					label={t('levelsPage:levelUpMessage.messageBehavior')}
					fullWidth
					select
					items={levelUpChannelOptions}
					value={field.value}
					onChange={e => field.onChange(e.target.value)}
					error={fieldState.invalid}
					helperText={fieldState.error?.message}
				/>
			)}
		/>
	);
}
