import useSWR from 'swr';
import axios from 'axios';

import { SubmitHandler } from 'react-hook-form';

import { styled } from '@mui/material';

import DataSaveToaster from '@components/DataSaveToaster';

import useGuildId from '@hooks/useGuildId';
import { fetcher } from '@utils/utils';

import AddAutoRole from './AddAutoRole';
import AutoRoleList from './AutoRoleList';
import useAutoRolesForm from './useAutoRolesForm';

import type { AutoRolePageData, Role } from 'types';

const Section = styled('section')({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export default function AutoRoles(): JSX.Element {
	const guildId = useGuildId();

	const { data: roles } = useSWR<Role[]>(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/roles`, fetcher);
	const { data: autoRolesData } = useSWR<AutoRolePageData>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/auto-roles`,
		fetcher
	);

	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty },
	} = useAutoRolesForm({ defaultValues: autoRolesData });

	const onSubmit: SubmitHandler<AutoRolePageData> = async autoRolesData => {
		const data = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/auto-roles`, autoRolesData, {
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
