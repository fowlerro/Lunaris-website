import ServerAcronymIcon from '@components/ServerAcronymIcon';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import React from 'react';
import { GuildStats } from 'types';

interface IProps {
	guildId: string;
	name: string;
	icon: GuildStats['icon'];
}

const IconWrapper = styled('div')({
	position: 'relative',
	width: '4rem',
	height: '4rem',
	marginInline: 'auto',
});

export default function ServerName({ guildId, name, icon }: IProps): JSX.Element {
	return (
		<div>
			<IconWrapper>
				{icon.hash ? (
					<Image
						src={`https://cdn.discordapp.com/icons/${guildId}/${icon.hash}.webp`}
						alt='Server Icon'
						layout='fill'
					/>
				) : (
					<ServerAcronymIcon>{icon.acronym}</ServerAcronymIcon>
				)}
			</IconWrapper>
			<Typography variant='h3' component='h1'>
				{name}
			</Typography>
		</div>
	);
}
