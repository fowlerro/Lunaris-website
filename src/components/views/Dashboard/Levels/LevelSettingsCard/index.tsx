import { useTranslation } from 'next-i18next';
import { Control, UseFormRegister, FieldErrors, useWatch } from 'react-hook-form';

import { Switch, Typography } from '@mui/material';

import DashboardCard from '@components/DashboardCard';
import Explanation from '@components/Explanation';

import MultiplierSlider from './MultiplierSlider';
import LevelUpMessageMode from './LevelUpMessageMode';
import LevelUpChannel from './LevelUpChannel';
import LevelUpMessageFormat from './LevelUpMessageFormat';

import type { GuildChannels, LevelConfigPageData } from 'types';

interface IProps {
	defaultValues: LevelConfigPageData;
	channels: GuildChannels;
	control: Control<LevelConfigPageData>;
	errors: FieldErrors<LevelConfigPageData>;
	register: UseFormRegister<LevelConfigPageData>;
}

export default function LevelSettingsCard({ defaultValues, channels, control, errors, register }: IProps): JSX.Element {
	const { t } = useTranslation();

	const { levelConfig } = useWatch({
		control,
	});

	return (
		<DashboardCard
			header={t('levelsPage:settingsHeader')}
			initialExpand
			action={
				<Explanation label={t('common:toggleModule')}>
					<Switch {...register('status')} defaultChecked={defaultValues.status} />
				</Explanation>
			}
		>
			<MultiplierSlider control={control} />
			<Typography variant='subtitle1' sx={{ fontWeight: 600, marginTop: 2 }} gutterBottom>
				{t('levelsPage:levelUpMessage.header')}
			</Typography>
			<LevelUpMessageMode control={control} />
			{levelConfig?.levelUpMessage?.mode === 'specificChannel' && (
				<LevelUpChannel channels={channels} control={control} />
			)}
			{levelConfig?.levelUpMessage?.mode !== 'off' && (
				<LevelUpMessageFormat
					defaultValue={defaultValues.levelConfig.levelUpMessage.messageFormat || ''}
					error={errors.levelConfig?.levelUpMessage?.messageFormat}
					register={register}
				/>
			)}
		</DashboardCard>
	);
}
