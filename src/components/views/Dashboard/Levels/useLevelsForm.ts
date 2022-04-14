import { useEffect, useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import isDeepEqual from 'fast-deep-equal/react';

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

	const defaultValuesRef = useRef(defaultValues);
	if (!isDeepEqual(defaultValuesRef.current, defaultValues)) defaultValuesRef.current = defaultValues;

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

	const form = useForm<LevelConfigPageData>({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		form.reset(defaultValuesRef.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValuesRef.current]);

	return form;
}
