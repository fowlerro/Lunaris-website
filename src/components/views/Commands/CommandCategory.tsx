import useTranslation from 'next-translate/useTranslation';

import { List, styled, Typography } from '@mui/material';

import Command from './Command';

interface IProps {
	searchInput: string;
	category: string;
	commands: {
		name: string;
		category: string;
		permissions?: string;
		options: boolean;
	}[];
}

const Category = styled(Typography)(({ theme }) => ({
	color: theme.colors.text.secondary,
	fontWeight: 500,
	marginTop: '1.5rem',
	marginBottom: '1rem',
})) as typeof Typography;

export default function CommandCategory({ searchInput, category, commands }: IProps): JSX.Element {
	const { t } = useTranslation('commands');
	return (
		<div>
			<Category variant='h3' component='h2'>
				{t(`categories.${category}.label`)}
			</Category>
			<List>
				{commands
					.filter(command => command.name.toLowerCase().includes(searchInput.toLowerCase()))
					.map(command => (
						<Command key={command.name} command={command} />
					))}
			</List>
		</div>
	);
}
