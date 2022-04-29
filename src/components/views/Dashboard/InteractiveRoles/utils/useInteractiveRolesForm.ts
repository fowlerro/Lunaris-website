import useTranslation from 'next-translate/useTranslation';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import type { GuildChannels, InteractiveRolesType, Role } from 'types';

export type InteractiveRolesFormValues = InteractiveRolesType;

interface IProps {
	defaultValues: InteractiveRolesFormValues;
	channels: GuildChannels | undefined;
	roles: Role[] | undefined;
}

export default function useEmbedForm({ defaultValues, channels = { text: [], category: [] }, roles = [] }: IProps) {
	const { t } = useTranslation();

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.required(t('forms:errors.required'))
			.max(32, t('forms:errors.maxLength', { count: 32 })),
		channelId: Yup.string()
			.required(t('forms:errors.required'))
			.oneOf(
				channels.text.map(({ id }) => id),
				t('forms:errors.invalidValue')
			),
		messageId: Yup.string().when('embedId', {
			is: (embedId: string) => Boolean(embedId),
			then: Yup.string().notRequired().optional(),
			otherwise: Yup.string().required(t('forms:errors.required')).length(18, t('forms:errors.invalidValue')),
		}),
		embedId: Yup.string(),
		type: Yup.string().required(t('forms:errors.required')).oneOf(['reactions', 'buttons', 'select']),
		placeholder: Yup.string().max(150, t('forms:errors.maxLength', { count: 150 })),
		roles: Yup.array()
			.of(
				Yup.object().shape({
					icon: Yup.string().when('type', {
						is: 'reactions',
						then: Yup.string().nullable(),
						otherwise: Yup.string().optional(),
					}),
					label: Yup.string()
						.max(80, t('forms:errors.maxLength', { count: 80 }))
						.when('type', {
							is: 'select',
							then: Yup.string().required(t('forms:errors.required')),
							otherwise: Yup.string().optional(),
						}),
					description: Yup.string()
						.max(100, t('forms:errors.maxLength', { count: 100 }))
						.when('type', {
							is: 'select',
							then: Yup.string().optional(),
							otherwise: Yup.string().nullable(),
						}),
					style: Yup.string().when('type', {
						is: 'buttons',
						then: Yup.string().oneOf(['PRIMARY', 'SECONDARY', 'SUCCESS', 'DANGER']),
						otherwise: Yup.string().nullable(),
					}),
					roleId: Yup.string()
						.required(t('forms:errors.required'))
						.oneOf(
							roles.map(({ id }) => id),
							t('forms:errors.invalidValue')
						),
					action: Yup.string().when('type', {
						is: 'select',
						then: Yup.string().nullable(),
						otherwise: Yup.string().oneOf(['add', 'remove', 'toggle']),
					}),
				})
			)
			.min(1, t('forms:errors.minItems', { count: 1 }))
			.max(25, t('forms:errors.maxItems', { count: 25 })),
	});

	const form = useForm<InteractiveRolesFormValues>({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	return form;
}
