import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

import { User } from 'types';
import { fetcher } from '@utils/utils';

interface IProps {
	redirectTo?: string;
	redirectIfFound?: boolean;
}

export default function useUser(): User | null;
export default function useUser({
	redirectTo,
	redirectIfFound,
}: {
	redirectTo: string;
	redirectIfFound?: boolean;
}): User;
export default function useUser({
	redirectTo,
	redirectIfFound,
}: {
	redirectTo?: undefined;
	redirectIfFound?: boolean;
}): User | null;
export default function useUser({ redirectTo, redirectIfFound }: IProps = {}): User | null {
	const { data, error } = useSWR(`${process.env.API_URL}/auth`, fetcher, {
		errorRetryCount: 3,
		revalidateOnFocus: false,
	});
	const user = data?.data;
	const finished = Boolean(data || error);
	const hasUser = Boolean(user);

	useEffect(() => {
		if (!redirectTo || !finished) return;
		if ((redirectTo && !redirectIfFound && !hasUser) || (redirectIfFound && hasUser)) Router.push(redirectTo);
	}, [redirectTo, redirectIfFound, finished, hasUser]);

	return user;
}
