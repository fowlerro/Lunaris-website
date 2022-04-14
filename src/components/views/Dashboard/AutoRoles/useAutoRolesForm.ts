import { useEffect, useRef } from 'react';
import isDeepEqual from 'fast-deep-equal/react';
import useTranslation from 'next-translate/useTranslation';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import type { AutoRolePageData } from 'types';

interface UseAutoRolesFormProps {
	defaultValues?: AutoRolePageData;
}

export default function useAutoRolesForm({ defaultValues = { status: false, autoRoles: [] } }: UseAutoRolesFormProps) {
	const { t } = useTranslation('forms');

	const defaultValuesRef = useRef(defaultValues);
	if (!isDeepEqual(defaultValuesRef.current, defaultValues)) defaultValuesRef.current = defaultValues;

	const validationSchema = Yup.object().shape({
		status: Yup.boolean().required(t('errors.required')),
		autoRoles: Yup.array()
			.of(
				Yup.object().shape({
					roleId: Yup.string().required(t('errors.required')),
					time: Yup.number().required(t('errors.required')),
				})
			)
			.max(5, t('errors.max', { count: 5 }))
			.test('unique', t('autoRolesPage:errors.duplicateRoles'), function (value) {
				const tempDuplicates = new Set();
				const hasDuplicates = value?.some(autoRole => tempDuplicates.size === tempDuplicates.add(autoRole.roleId).size);
				if (hasDuplicates) return false;
				return true;
			}),
	});

	const form = useForm<AutoRolePageData>({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		form.reset(defaultValuesRef.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValuesRef.current]);

	return form;
}
