import useSWR from 'swr';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext, useFieldArray } from 'react-hook-form';

import DashboardCard from '@components/DashboardCard';

import AddRoleModal from './AddRoleModal';
import RoleList from './RoleList';

import useGuildId from '@hooks/useGuildId';
import { fetcher } from '@utils/utils';

import type { InteractiveRolesFormValues } from '../../utils/useInteractiveRolesForm';
import type { GuildEmojis, Role } from 'types';

export default function RolesCard(): JSX.Element {
	const { t } = useTranslation('interactiveRolesPage');
	const guildId = useGuildId();

	const { data: roles } = useSWR<Role[]>(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/roles`, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnMount: false,
		revalidateOnReconnect: false,
	});

	const { data: globalEmojis } = useSWR<GuildEmojis>(`${process.env.NEXT_PUBLIC_API_URL}/emojis`, fetcher);
	const { data: guildEmojis } = useSWR<GuildEmojis>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/emojis`,
		fetcher
	);

	const { control } = useFormContext<InteractiveRolesFormValues>();
	const { fields, append, remove, update } = useFieldArray({ control, name: 'roles' });

	return (
		<DashboardCard header={t('creator.roles')}>
			<AddRoleModal append={append} guildRoles={roles} globalEmojis={globalEmojis} guildEmojis={guildEmojis} />
			<RoleList
				fields={fields}
				remove={remove}
				update={update}
				guildRoles={roles}
				globalEmojis={globalEmojis}
				guildEmojis={guildEmojis}
			/>
		</DashboardCard>
	);
}
