import useTranslation from 'next-translate/useTranslation';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import type { GuildChannels, LevelConfigPageData } from 'types';

interface UseLevelsFormProps {
	defaultValues?: LevelConfigPageData;
	channels?: GuildChannels;
}

export default function useLevelsForm({
	defaultValues = {
		status: false,
		levelConfig: {
			guildId: '',
			levelUpMessage: { mode: 'currentChannel', channelId: undefined, messageFormat: '' },
			multiplier: 1,
			rewards: { text: [], voice: [] },
		},
	},
	channels = { text: [], category: [] },
}: UseLevelsFormProps) {
	const { t } = useTranslation();

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
			rewards: Yup.object().shape({
				text: Yup.array()
					.of(
						Yup.object().shape({
							level: Yup.number()
								.integer(t('forms:errors.invalidValue'))
								.required(t('forms:errors.required'))
								.min(1, t('forms:errors.min', { count: 1 }))
								.max(200, t('forms:errors.max', { count: 200 })),
							roleId: Yup.string().length(18, t('forms:errors.invalidValue')).required(t('forms:errors.required')),
							takePreviousRole: Yup.boolean(),
						})
					)
					.max(20, t('forms:errors.max', { count: 20 })),
				voice: Yup.array()
					.of(
						Yup.object().shape({
							level: Yup.number()
								.integer(t('forms:errors.invalidValue'))
								.required(t('forms:errors.required'))
								.min(1, t('forms:errors.min', { count: 1 }))
								.max(200, t('forms:errors.max', { count: 200 })),
							roleId: Yup.string().length(18, t('forms:errors.invalidValue')).required(t('forms:errors.required')),
							takePreviousRole: Yup.boolean(),
						})
					)
					.max(20, t('forms:errors.max', { count: 20 })),
			}),
		}),
	});

	const form = useForm<LevelConfigPageData>({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	const { reset } = form;

	useDeepCompareEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset]);

	return form;
}
