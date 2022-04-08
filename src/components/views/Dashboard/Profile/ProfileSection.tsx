import { styled } from '@mui/material';

import ProfileCard from './ProfileCard';

import type { ProfileWithRank } from 'types';

interface IProps {
	profile: ProfileWithRank;
}

const Section = styled('section')({
	padding: '1rem',
});

export default function ProfileSection({ profile }: IProps): JSX.Element {
	return (
		<Section>
			<ProfileCard profile={profile} />
		</Section>
	);
}
