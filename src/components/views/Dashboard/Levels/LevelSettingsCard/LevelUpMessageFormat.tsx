import TextField from '@components/Inputs/TextField';
import useTranslation from 'next-translate/useTranslation';
import { Control, Controller } from 'react-hook-form';

import type { LevelConfigPageData } from 'types';

interface IProps {
	control: Control<LevelConfigPageData>;
}

export default function LevelUpMessageFormat({ control }: IProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<Controller
			name='levelConfig.levelUpMessage.messageFormat'
			control={control}
			render={({ field, fieldState }) => (
				<TextField
					characterLimit={256}
					multiline
					rows={4}
					label={t('levelsPage:levelUpMessage.messageFormat')}
					fullWidth
					margin={'normal'}
					{...field}
					error={fieldState.invalid}
					helperText={fieldState.error?.message}
				/>
			)}
		/>
	);
}
