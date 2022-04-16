import useTranslation from 'next-translate/useTranslation';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import type { GuildChannels, InteractiveRolesType, Role } from 'types';

export type InteractiveRolesFormValues = InteractiveRolesType & { embedId: string };

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
		messageId: Yup.string().required(t('forms:errors.required')),
		type: Yup.string().required(t('forms:errors.required')).oneOf(['reactions', 'buttons', 'select']),
		roles: Yup.array()
			.of(
				Yup.object().shape({
					label: Yup.string().when('type', {
						is: 'buttons',
						then: Yup.string().optional(),
						otherwise: Yup.string().required(t('forms:errors.required')),
					}),
					description: Yup.string().when('type', {
						is: 'select',
						then: Yup.string().optional(),
						otherwise: Yup.string().length(0, t('forms:errors.invalidValue')),
					}),
					icon: Yup.string().when('type', {
						is: 'reactions',
						then: Yup.string().length(0, t('forms:errors.invalidValue')),
						otherwise: Yup.string().optional(),
					}),
					style: Yup.string().when('type', {
						is: 'buttons',
						then: Yup.string().oneOf(['PRIMARY', 'SECONDARY', 'SUCCESS', 'DANGER']),
						otherwise: Yup.string().length(0, t('forms:errors.invalidValue')),
					}),
					roleId: Yup.string()
						.required(t('forms:errors.required'))
						.oneOf(
							roles.map(({ id }) => id),
							t('forms:errors.invalidValue')
						),
					action: Yup.string().when('type', {
						is: 'select',
						then: Yup.string().length(0, t('forms:errors.invalidValue')),
						otherwise: Yup.string().oneOf(['add', 'remove', 'toggle']),
					}),
				})
			)
			.max(25, t('forms:errors.maxLength', { count: 25 })),
	});

	const form = useForm<InteractiveRolesType & { embedId: string }>({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	return form;
}
