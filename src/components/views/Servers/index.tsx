import useSWR from 'swr';

import ServersSection from './ServersSection';

import { fetcher } from '@utils/utils';

import type { MutualGuilds } from 'types';
import useUser from '@hooks/useUser';

export default function Servers(): JSX.Element {
	useUser({ redirectTo: '/' });
	const { data: guilds } = useSWR<MutualGuilds>(`${process.env.NEXT_PUBLIC_API_URL}/guilds`, fetcher);

	return (
		<>
			<ServersSection guilds={guilds?.included} />
			<ServersSection guilds={guilds?.excluded} excluded />
		</>
	);
}
