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
	{ name: 'Ban', category: 'moderation' },
	{ name: 'Warn', category: 'moderation' },
	{ name: 'Welcome', category: 'moderation' },
	{ name: 'Profile', category: 'misc' },
	{ name: 'Ranking', category: 'misc' },
	{ name: 'Level', category: 'settings' },
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
