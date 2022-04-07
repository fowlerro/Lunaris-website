import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import axios from 'axios';

import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { styled } from '@mui/material';

import DataSaveToaster from '@components/DataSaveToaster';

import AddAutoRole from './AddAutoRole';
import AutoRoleList from './AutoRoleList';

import type { AutoRolePageData, Role } from 'types';

interface IProps {
	autoRolesData: AutoRolePageData;
	roles: Role[];
}

const Section = styled('section')({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export default function AutoRoles({ autoRolesData, roles }: IProps): JSX.Element {
	const { t } = useTranslation();
	const router = useRouter();
	const guildId = router.query.guildId;

	const validationSchema = Yup.object().shape({
		status: Yup.boolean().required(t('forms:errors.required')),
		autoRoles: Yup.array()
			.of(
				Yup.object().shape({
					roleId: Yup.string().required(t('forms:errors.required')),
					time: Yup.number().required(t('forms:errors.required')),
				})
			)
			.max(5, t('forms:errors.max', { count: 5 }))
			.test('unique', t('autoRolesPage:errors.duplicateRoles'), function (value) {
				const tempDuplicates = new Set();
				const hasDuplicates = value?.some(autoRole => tempDuplicates.size === tempDuplicates.add(autoRole.roleId).size);
				if (hasDuplicates) return false;
				return true;
			}),
	});

	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty },
	} = useForm<AutoRolePageData>({
		defaultValues: {
			status: autoRolesData.status,
			autoRoles: autoRolesData.autoRoles,
		},
		resolver: yupResolver(validationSchema),
	});

	const onSubmit: SubmitHandler<AutoRolePageData> = async autoRolesData => {
		const data = await axios.put(`${process.env.API_URL}/guilds/${guildId}/auto-roles`, autoRolesData, {
			withCredentials: true,
		});
		if (data.status === 200) {
			reset(autoRolesData);
		}
	};

	return (
		<Section>
			<AddAutoRole roles={roles} control={control} />
			<AutoRoleList roles={roles} control={control} />
			<DataSaveToaster isDataChanged={isDirty} onSave={handleSubmit(onSubmit)} onReset={reset} />
		</Section>
	);
}
