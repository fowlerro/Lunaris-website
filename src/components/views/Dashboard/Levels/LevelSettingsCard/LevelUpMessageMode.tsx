import { useTranslation } from 'next-i18next';
import { FieldError, UseFormRegister } from 'react-hook-form';

import { MenuItem, TextField, Typography } from '@mui/material';

import type { LevelConfigPageData } from 'types';

interface IProps {
	defaultValue: string;
	error?: FieldError;
	register: UseFormRegister<LevelConfigPageData>;
}

const levelUpChannelOptions = ['currentChannel', 'specificChannel', 'off'];

export default function LevelUpMessageMode({ defaultValue, error, register }: IProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<TextField
			label={t('dashboardPage:levels.levelUpMessage.messageBehavior')}
			fullWidth
			select
			SelectProps={{
				renderValue: val =>
					t(
						`dashboardPage:levels.levelUpMessage.mode.${
							levelUpChannelOptions.find(option => option === val) || 'off'
						}.label`
					),
			}}
			defaultValue={defaultValue}
			margin='normal'
			error={!!error}
			helperText={error?.message}
			{...register('levelConfig.levelUpMessage.mode')}
		>
			{levelUpChannelOptions.map(option => (
				<MenuItem
					key={option}
					value={option}
					sx={{ flexDirection: 'column', placeItems: 'flex-start', textAlign: 'left' }}
				>
					<Typography>{t(`dashboardPage:levels.levelUpMessage.mode.${option}.label`)}</Typography>
					<Typography variant='caption' sx={{ color: theme => theme.colors.text.secondary }}>
						{t(`dashboardPage:levels.levelUpMessage.mode.${option}.description`)}
					</Typography>
				</MenuItem>
			))}
		</TextField>
	);
}
