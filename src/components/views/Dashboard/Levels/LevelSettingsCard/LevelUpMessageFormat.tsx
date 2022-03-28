import { useTranslation } from 'next-i18next';
import type { FieldError, UseFormRegister } from 'react-hook-form';

import { TextField } from '@mui/material';

import type { LevelConfigPageData } from 'types';

interface IProps {
	defaultValue: string;
	error?: FieldError;
	register: UseFormRegister<LevelConfigPageData>;
}

export default function LevelUpMessageFormat({ defaultValue, error, register }: IProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<TextField
			multiline
			rows={4}
			label={t('dashboardPage:levels.levelUpMessage.messageFormat')}
			fullWidth
			{...register('levelConfig.levelUpMessage.messageFormat')}
			defaultValue={defaultValue}
			margin={'normal'}
			error={!!error}
			helperText={error?.message}
		/>
	);
}
