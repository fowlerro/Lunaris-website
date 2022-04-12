import TextField from '@components/Inputs/TextField';
import useTranslation from 'next-translate/useTranslation';
import type { FieldError, UseFormRegister } from 'react-hook-form';

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
			characterLimit={256}
			multiline
			rows={4}
			label={t('levelsPage:levelUpMessage.messageFormat')}
			fullWidth
			{...register('levelConfig.levelUpMessage.messageFormat')}
			defaultValue={defaultValue}
			margin={'normal'}
			error={!!error}
			helperText={error?.message}
		/>
	);
}
