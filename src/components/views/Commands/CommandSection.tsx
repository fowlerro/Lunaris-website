import { styled } from '@mui/material';
import CommandCategory from './CommandCategory';

interface IProps {
	searchInput: string;
	category: string;
}

const Section = styled('section')(({ theme }) => ({
	backgroundColor: theme.colors.background.secondary,
	padding: '2rem 1rem',

	[theme.breakpoints.up('md')]: {
		backgroundColor: theme.colors.background.primary,
	},

	[theme.breakpoints.up('lg')]: {
		paddingInline: '10%',
	},
}));

const commands = [
	{ name: 'color', category: 'miscellaneous', options: true },
	{ name: 'help', category: 'miscellaneous', options: false },
	{ name: 'profile', category: 'miscellaneous', options: true },
	{ name: 'ranking', category: 'miscellaneous', options: true },
	{ name: 'ban', category: 'moderation', options: true, permissions: 'BAN_MEMBERS' },
	{ name: 'warn', category: 'moderation', options: true, permissions: 'MANAGE' },
	{ name: 'mute', category: 'moderation', options: true, permissions: 'MODERATE_MEMBERS' },
	{ name: 'purge', category: 'moderation', options: true, permissions: 'MANAGE_MESSAGES' },
	{ name: 'emoji', category: 'settings', options: true, permissions: 'MANAGE_EMOJIS' },
];

export default function CommandSection({ searchInput, category }: IProps): JSX.Element {
	const categories = commands.reduce(
		(prev, curr) => (prev.includes(curr.category) ? prev : [...prev, curr.category]),
		[] as string[]
	);
	return (
		<Section>
			{categories
				.filter(
					cat =>
						cat.includes(category) &&
						commands.filter(command => command.category === cat && command.name.includes(searchInput)).length
				)
				.map(cat => (
					<CommandCategory
						key={cat}
						category={cat}
						commands={commands.filter(command => command.category === cat)}
						searchInput={searchInput}
					/>
				))}
		</Section>
	);
}
