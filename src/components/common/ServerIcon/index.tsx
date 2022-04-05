import { styled } from '@mui/material';

import ServerAcronymIcon from '@components/ServerAcronymIcon';
import Avatar from '@components/Avatar';

interface IProps {
	id: string;
	name: string;
	acronym?: string;
	icon: string | null;
}

const Wrapper = styled('div')({
	position: 'relative',
	width: '100%',
	height: '100%',
	borderRadius: '50%',
});

export default function ServerIcon({ id, name, icon, acronym }: IProps): JSX.Element {
	const altAcronym = name.split(' ').map(word => word[0]);
	return (
		<Wrapper>
			{icon ? (
				<Avatar src={`https://cdn.discordapp.com/icons/${id}/${icon}.webp`} layout='fill' />
			) : (
				<ServerAcronymIcon>{acronym || altAcronym}</ServerAcronymIcon>
			)}
		</Wrapper>
	);
}
