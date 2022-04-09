import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import axios from 'axios';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { styled } from '@mui/material';

import DataSaveToaster from '@components/DataSaveToaster';

import LevelSettingsCard from './LevelSettingsCard';
import LevelRewardsCard from './LevelRewardsCard';

import type { GuildChannels, LevelConfigPageData, Role } from '@types';

interface IProps {
	channels: GuildChannels;
	roles: Role[];
	levelConfig: LevelConfigPageData;
}

const Section = styled('section')({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export default function Levels({ channels, roles, levelConfig }: IProps): JSX.Element {
	const { t } = useTranslation();
	const router = useRouter();
	const guildId = router.query.guildId as string;

	const validationSchema = Yup.object().shape({
		status: Yup.boolean(),
		levelConfig: Yup.object().shape({
			multiplier: Yup.number()
				.min(0, t('forms:errors.min', { count: 0 }))
				.max(5, t('forms:errors.max', { count: 5 })),
			levelUpMessage: Yup.object().shape({
				mode: Yup.string()
					.oneOf(['currentChannel', 'specificChannel', 'off'], t('forms:errors.invalidOption'))
					.required(t('forms:errors.required')),
				channelId: Yup.string().when('mode', {
					is: 'specificChannel',
					then: Yup.string()
						.required(t('forms:errors.required'))
						.oneOf(
							channels.text.map(channel => channel.id),
							t('forms:errors.invalidOption')
						),
				}),
				messageFormat: Yup.string().max(256, t('forms:errors.maxLength', { count: 256 })),
			}),
		}),
	});

	const {
		register,
		handleSubmit,
		control,
		formState: { isDirty, errors },
		reset,
	} = useForm<LevelConfigPageData>({
		defaultValues: {
			status: !!levelConfig.status,
			levelConfig: {
				multiplier: levelConfig.levelConfig.multiplier || 1,
				levelUpMessage: {
					mode: levelConfig.levelConfig.levelUpMessage.mode || 'currentChannel',
					channelId: levelConfig.levelConfig.levelUpMessage.channelId || '',
					messageFormat: levelConfig.levelConfig.levelUpMessage.messageFormat || '',
				},
				rewards: {
					text: levelConfig.levelConfig.rewards.text || [],
					voice: levelConfig.levelConfig.rewards.voice || [],
				},
			},
		},
		resolver: yupResolver(validationSchema),
	});

	const onSubmit: SubmitHandler<LevelConfigPageData> = async levelData => {
		const { data } = await axios.put(`${process.env.API_URL}/guilds/${guildId}/levels`, levelData, {
			withCredentials: true,
		});
		reset(data);
	};
	return (
		<Section>
			<LevelSettingsCard
				defaultValues={levelConfig}
				channels={channels}
				control={control}
				errors={errors}
				register={register}
			/>
			<LevelRewardsCard roles={roles} control={control} />
			<DataSaveToaster isDataChanged={isDirty} onSave={handleSubmit(onSubmit)} onReset={() => reset()} />
		</Section>
	);
}
