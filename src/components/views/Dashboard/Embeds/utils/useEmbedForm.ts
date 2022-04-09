import { useTranslation } from 'next-i18next';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { EMBED_LIMITS } from '@utils/utils';

import type { EmbedMessage, GuildChannels } from 'types';

interface IProps {
	defaultValues: EmbedMessage;
	channels: GuildChannels;
}

export default function useEmbedForm({ defaultValues, channels }: IProps) {
	const { t } = useTranslation();

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.required(t('forms:errors.required'))
			.max(32, t('forms:errors.maxLength', { count: 32 })),
		channelId: Yup.string()
			.optional()
			.oneOf(
				channels.text.map(({ id }) => id),
				t('forms:errors.invalidValue')
			),
		messageContent: Yup.string().max(
			EMBED_LIMITS.messageContent,
			t('forms:errors.maxLength', { count: EMBED_LIMITS.messageContent })
		),
		embed: Yup.object()
			.shape({
				hexColor: Yup.string()
					.required(t('forms:errors.required'))
					.matches(/^#[0-9A-F]{6}$/i, t('forms:errors.invalidValue')),
				author: Yup.object().shape({
					name: Yup.string()
						.max(EMBED_LIMITS.author, t('forms:errors.maxLength', { count: EMBED_LIMITS.author }))
						.when(['author.url', 'author.iconURL'], {
							is: (url: string, iconURL: string) => Boolean(url) || Boolean(iconURL),
							then: Yup.string().required(t('forms:errors.required')),
						}),
					url: Yup.string().url(t('forms:errors.invalidURL')),
					iconURL: Yup.string().url(t('forms:errors.invalidURL')),
				}),
				description: Yup.string().max(
					EMBED_LIMITS.description,
					t('forms:errors.maxLength', { count: EMBED_LIMITS.description })
				),
				title: Yup.string().max(EMBED_LIMITS.title, t('forms:errors.maxLength', { count: EMBED_LIMITS.title })),
				url: Yup.string().url(t('forms:errors.invalidURL')),
				image: Yup.object().shape({
					url: Yup.string().url(t('forms:errors.invalidURL')),
				}),
				thumbnail: Yup.object().shape({
					url: Yup.string().url(t('forms:errors.invalidURL')),
				}),
				footer: Yup.object().shape({
					text: Yup.string().max(EMBED_LIMITS.footer, t('forms:errors.maxLength', { count: EMBED_LIMITS.footer })),
					iconURL: Yup.string().url(t('forms:errors.invalidURL')),
				}),
				timestamp: Yup.number().typeError(t('forms:errors.invalidValue')),
				fields: Yup.array()
					.of(
						Yup.object().shape({
							name: Yup.string()
								.required(t('forms:errors.required'))
								.max(EMBED_LIMITS.field.name, t('forms:errors.maxLength', { count: EMBED_LIMITS.field.name })),
							value: Yup.string()
								.required(t('forms:errors.required'))
								.max(EMBED_LIMITS.field.value, t('forms:errors.maxLength', { count: EMBED_LIMITS.field.value })),
							inline: Yup.boolean(),
						})
					)
					.max(EMBED_LIMITS.field.amount, t('forms:errors.max', { count: EMBED_LIMITS.field.amount })),
			})
			.test('emptyEmbed', 'Embed Message cannot be empty', embed =>
				Boolean(
					embed.author.name ||
						embed.description ||
						embed.title ||
						embed.image.url ||
						embed.thumbnail.url ||
						embed.footer.text ||
						embed.fields?.length
				)
			),
	});

	const form = useForm<EmbedMessage>({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	return form;
}
