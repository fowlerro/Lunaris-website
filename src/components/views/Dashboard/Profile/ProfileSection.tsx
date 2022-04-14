import useSWR from 'swr';

import { styled } from '@mui/material';

import ProfileCard from './ProfileCard';

import { fetcher } from '@utils/utils';

import type { ProfileWithRank } from 'types';

const Section = styled('section')({
	padding: '1rem',
});

export default function ProfileSection(): JSX.Element {
	const { data: profile } = useSWR<ProfileWithRank>(`${process.env.NEXT_PUBLIC_API_URL}/profile`, fetcher);

	return (
		<Section>
			<ProfileCard profile={profile} />
		</Section>
	);
}
