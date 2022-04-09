import { useTranslation } from 'next-i18next';
import { Controller, Control } from 'react-hook-form';

import { Slider, Typography } from '@mui/material';

import type { LevelConfigPageData } from '@types';

interface IProps {
	control: Control<LevelConfigPageData>;
}

export default function MultiplierSlider({ control }: IProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<Controller
			control={control}
			name={'levelConfig.multiplier'}
			render={({ field }) => (
				<>
					<Typography marginTop={1}>{t('levelsPage:multiplier')}</Typography>
					<Slider
						size='small'
						aria-label={t('levelsPage:multiplier')}
						value={field.value}
						onChange={(e, value) => field.onChange(value)}
						min={0}
						max={5}
						step={0.01}
						valueLabelDisplay='auto'
						marks={[
							{ value: 0, label: '0' },
							{ value: 1, label: '1' },
							{ value: 2, label: '2' },
							{ value: 3, label: '3' },
							{ value: 4, label: '4' },
							{ value: 5, label: '5' },
						]}
					/>
				</>
			)}
		/>
	);
}
