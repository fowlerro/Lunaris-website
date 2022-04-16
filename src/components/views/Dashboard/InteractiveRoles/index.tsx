import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import DashboardLayout from '@layouts/DashboardLayout';
import { fetcher } from '@utils/utils';

import type { GuildChannels, InteractiveRolesType, Role } from 'types';

export default function InteractiveRoles({ children }: { children: ReactNode }): JSX.Element {
	const router = useRouter();
	const guildId = router.query.guildId as string;

	useSWR<GuildChannels>(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/channels`, fetcher);
	useSWR<Role[]>(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/roles`, fetcher);
	useSWR<InteractiveRolesType[]>(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/interactive-roles`, fetcher);

	return <DashboardLayout>{children}</DashboardLayout>;
}
