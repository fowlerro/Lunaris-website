import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import axios from 'axios';

import { User } from 'types';

interface IProps {
	redirectTo?: string;
	redirectIfFound?: boolean;
}

const fetcher = (url: string) => axios(url, { withCredentials: true });

export default function useUser({ redirectTo, redirectIfFound }: IProps): User | null {
	const { data, error } = useSWR(`${process.env.apiDomain}/api/auth`, fetcher);
	const user = data?.data;
	const finished = Boolean(data || error);
	const hasUser = Boolean(user);

	useEffect(() => {
		if (!redirectTo || !finished) return;
		if ((redirectTo && !redirectIfFound && !hasUser) || (redirectIfFound && hasUser)) Router.push(redirectTo);
	}, [redirectTo, redirectIfFound, finished, hasUser]);

	return error ? null : user;
}
