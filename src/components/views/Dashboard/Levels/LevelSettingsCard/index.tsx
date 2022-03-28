import { useTranslation } from 'next-i18next';
import { Control, UseFormRegister, UseFormGetValues, FieldErrors } from 'react-hook-form';

import { Badge, Switch, Tooltip, Typography } from '@mui/material';

import DashboardCard from '@components/DashboardCard';

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
	getValues: UseFormGetValues<LevelConfigPageData>;
}

export default function LevelSettingsCard({
	defaultValues,
	channels,
	control,
	errors,
	register,
	getValues,
}: IProps): JSX.Element {
	const { t } = useTranslation();

	return (
		<DashboardCard
			header={t('dashboardPage:levels.settingsHeader')}
			action={
				<Tooltip title={t('common:toggleModule').toString()}>
					<Badge badgeContent='?' overlap='circular' sx={{ color: theme => theme.colors.primary.main }}>
						<Switch {...register('status')} defaultChecked={defaultValues.status} />
					</Badge>
				</Tooltip>
			}
		>
			<MultiplierSlider control={control} />
			<Typography variant='subtitle1' sx={{ fontWeight: 600, marginTop: 2 }} gutterBottom>
				{t('dashboardPage:levels.levelUpMessage.header')}
			</Typography>
			<LevelUpMessageMode
				defaultValue={defaultValues.levelConfig.levelUpMessage.mode}
				error={errors.levelConfig?.levelUpMessage?.mode}
				register={register}
			/>
			{getValues().levelConfig.levelUpMessage.mode === 'specificChannel' && (
				<LevelUpChannel
					defaultValue={defaultValues.levelConfig.levelUpMessage.channelId || ''}
					channels={channels}
					control={control}
					error={errors.levelConfig?.levelUpMessage?.channelId}
				/>
			)}
			{getValues().levelConfig.levelUpMessage.mode !== 'off' && (
				<LevelUpMessageFormat
					defaultValue={defaultValues.levelConfig.levelUpMessage.messageFormat || ''}
					error={errors.levelConfig?.levelUpMessage?.messageFormat}
					register={register}
				/>
			)}
		</DashboardCard>
	);
}
