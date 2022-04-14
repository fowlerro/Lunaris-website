import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

import { fetcher } from '@utils/utils';

import type { User } from 'types';

interface IProps {
	redirectTo?: string;
	redirectIfFound?: boolean;
}

export default function useUser({ redirectTo, redirectIfFound }: IProps = {}): User | null {
	const { data: user, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/auth`, fetcher, {
		errorRetryCount: 3,
		revalidateOnFocus: false,
	});
	const finished = Boolean(user || error);
	const hasUser = Boolean(user);

	useEffect(() => {
		if (!redirectTo || !finished) return;
		if ((redirectTo && !redirectIfFound && !hasUser) || (redirectIfFound && hasUser)) Router.push(redirectTo);
	}, [redirectTo, redirectIfFound, finished, hasUser]);

	return user;
}
