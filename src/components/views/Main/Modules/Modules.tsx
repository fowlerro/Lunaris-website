import { useTranslation } from 'next-i18next';

import { styled } from '@mui/material';

import ModuleItem from './ModuleItem';

const Section = styled('section')(({ theme }) => ({
	backgroundColor: theme.colors.background.secondary,
	textAlign: 'center',
	padding: '4rem 1rem',

	[theme.breakpoints.up('lg')]: {
		textAlign: 'left',
		'& > *:nth-of-type(odd)': {
			marginLeft: '15%',
		},
		'& > *:nth-of-type(even)': {
			marginLeft: '60%',
		},
	},
}));

const modules = ['embeds', 'reactionRoles', 'levels', 'autoRoles', 'welcomeMessages', 'serverLogs'];

export default function Modules(): JSX.Element {
	const { t } = useTranslation();
	return (
		<Section>
			{modules.map(module => (
				<ModuleItem
					id={module}
					key={module}
					title={t(`modules:${module}.title`)}
					description={t(`modules:${module}.shortDesc`)}
				/>
			))}
		</Section>
	);
}
