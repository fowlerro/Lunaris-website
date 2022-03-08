import { styled } from '@mui/material';
import ModuleCard from './ModuleCard';

const Section = styled('section')(({ theme }) => ({
	backgroundColor: theme.colors.background.primary,
	padding: '2rem 1rem',
	display: 'grid',
	gap: '.5rem',
	gridTemplateColumns: '1fr',
	maxWidth: theme.breakpoints.values.xxl,

	[theme.breakpoints.up('md')]: {
		gridTemplateColumns: 'repeat(3, 1fr)',
	},

	[theme.breakpoints.up('lg')]: {
		paddingInline: '10%',
	},
}));

const modules = [
	{ name: 'embeds', commands: [] },
	{ name: 'reactionRoles', commands: [] },
	{
		name: 'levels',
		commands: [
			'/profile',
			'/ranking',
			'/level multiplier',
			'/level level-up-message',
			'/level level-up-channel',
			'/level rewards add',
			'/level rewards remove',
			'/level rewards list',
		],
	},
	{ name: 'autoRoles', commands: [] },
	{
		name: 'welcomeMessages',
		commands: ['/welcome status', '/welcome add', '/welcome delete', '/welcome set', '/welcome list'],
	},
	{
		name: 'serverLogs',
		commands: ['/logs status', '/logs toggle', '/logs channel'],
	},
];

export default function ModuleSection(): JSX.Element {
	return (
		<Section>
			{modules.map(module => (
				<ModuleCard key={module.name} module={module.name} commands={module.commands} />
			))}
		</Section>
	);
}
