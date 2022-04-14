import useTranslation from 'next-translate/useTranslation';
import { Control, useWatch } from 'react-hook-form';

import { Typography } from '@mui/material';

import DashboardCard from '@components/DashboardCard';
import Explanation from '@components/Explanation';
import ControlledSwitch from '@components/Inputs/Controlled/ControlledSwitch';

import MultiplierSlider from './MultiplierSlider';
import LevelUpMessageMode from './LevelUpMessageMode';
import LevelUpChannel from './LevelUpChannel';
import LevelUpMessageFormat from './LevelUpMessageFormat';

import type { GuildChannels, LevelConfigPageData } from 'types';

interface IProps {
	channels: GuildChannels | undefined;
	control: Control<LevelConfigPageData>;
}

export default function LevelSettingsCard({ channels, control }: IProps): JSX.Element {
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
					<ControlledSwitch name='status' control={control} />
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
			{levelConfig?.levelUpMessage?.mode !== 'off' && <LevelUpMessageFormat control={control} />}
		</DashboardCard>
	);
}
