import { useTranslation } from 'next-i18next';

import { styled, Typography } from '@mui/material';

import ServerCard from './ServerCard';

import type { Guild } from 'types';

interface IProps {
	guilds: Guild[];
	excluded?: boolean;
}

const Section = styled('section')({
	padding: '1rem',
	textAlign: 'center',
});

const GridWrapper = styled('div')({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(0, 18rem))',
	columnGap: '1rem',
	rowGap: '4rem',
	justifyContent: 'center',
	maxWidth: '60rem',
	marginInline: 'auto',
});

export default function ServersSection({ guilds, excluded = false }: IProps): JSX.Element {
	const { t } = useTranslation('serversPage');
	const header = excluded ? t('inviteToServer') : t('manageServer');
	return (
		<Section>
			<Typography variant='h2' component='h1' sx={{ marginBlock: '2rem 3rem' }}>
				{header}
			</Typography>
			<GridWrapper>
				{guilds.map(guild => (
					<ServerCard
						key={guild.id}
						id={guild.id}
						name={guild.name}
						icon={guild.icon}
						permissions={guild.owner ? t('permissions.owner') : t('permissions.manager')}
						excluded={excluded}
					/>
				))}
			</GridWrapper>
		</Section>
	);
}
