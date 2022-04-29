import useTranslation from 'next-translate/useTranslation';
import type { Translate } from 'next-translate';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import type { InteractiveRoleAction, InteractiveRoleStyle, InteractiveRoleType, Role } from 'types';

interface UniqueValues {
	icon: string | undefined;
	label: string | undefined;
}

interface UseAddRoleFormProps {
	defaultValues: AddRoleFormValues;
	type: InteractiveRoleType;
	roles: Role[];
	unique: UniqueValues[];
}

export interface AddRoleFormValues {
	icon?: string;
	label?: string;
	description?: string;
	style?: InteractiveRoleStyle;
	roleId: string;
	action?: InteractiveRoleAction;
}

export const validActions = ['add', 'remove', 'toggle'];
export const validStyles = ['PRIMARY', 'SECONDARY', 'SUCCESS', 'DANGER'];

export default function useAddRoleForm({ defaultValues, type, roles, unique }: UseAddRoleFormProps) {
	const { t } = useTranslation('forms');

	const roleIds = roles.map(role => role.id);
	const validationSchema = getFormValidation(t, type, roleIds, unique);

	const form = useForm({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	return form;
}

function getFormValidation(t: Translate, type: InteractiveRoleType, roleIds: string[], unique: UniqueValues[]) {
	if (type === 'reactions')
		return Yup.object().shape({
			icon: Yup.string()
				.required(t('errors.required'))
				.test({
					name: 'duplicate',
					message: t('errors.duplicate'),
					test: function (icon) {
						return !!icon && !unique.find(u => u.icon === icon);
					},
				}),
			roleId: Yup.string()
				.required(t('errors.required'))
				.oneOf(roleIds, t('errors.invalidValue'))
				.length(18, t('errors.invalidValue')),
			action: Yup.string().oneOf(validActions, t('errors.invalidValue')),
		});

	if (type === 'buttons')
		return Yup.object()
			.shape(
				{
					icon: Yup.string().when('label', {
						is: (label: string) => !label,
						then: schema => schema.required(t('errors.required')),
					}),
					label: Yup.string()
						.max(80, t('errors.maxLength', { length: 80 }))
						.when('icon', {
							is: (icon: string) => !icon,
							then: schema => schema.required(t('errors.required')),
						}),
					style: Yup.string().oneOf(validStyles, t('errors.invalidValue')),
					roleId: Yup.string()
						.required(t('errors.required'))
						.oneOf(roleIds, t('errors.invalidValue'))
						.length(18, t('errors.invalidValue')),
					action: Yup.string().oneOf(validActions, t('errors.invalidValue')),
				},
				[['icon', 'label']]
			)
			.test('duplicates', function (form, { createError }) {
				if (!unique.find(u => u.icon === form.icon && u.label === form.label)) return true;
				return createError({
					path: 'label',
					message: t('errors.duplicates', {
						fields: `${t('interactiveRolesPage:creator.roleList.icon')}, ${t(
							'interactiveRolesPage:creator.roleList.label'
						)}`,
					}),
				});
			});

	return Yup.object()
		.shape({
			icon: Yup.string(),
			label: Yup.string()
				.max(80, t('errors.maxLength', { length: 80 }))
				.required(t('errors.required')),
			description: Yup.string().max(100, t('errors.maxLength', { length: 100 })),
			roleId: Yup.string()
				.required(t('errors.required'))
				.oneOf(roleIds, t('errors.invalidValue'))
				.length(18, t('errors.invalidValue')),
		})
		.test('duplicates', function (form, { createError }) {
			if (!unique.find(u => u.icon === form.icon && u.label === form.label)) return true;
			return createError({
				path: 'label',
				message: t('errors.duplicates', {
					fields: `${t('interactiveRolesPage:creator.roleList.icon')}, ${t(
						'interactiveRolesPage:creator.roleList.label'
					)}`,
				}),
			});
		});
}
