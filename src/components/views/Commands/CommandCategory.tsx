import useTranslation from 'next-translate/useTranslation';

import { Masonry } from '@mui/lab';
import { styled, Typography } from '@mui/material';

import CommandCard from './CommandCard';

interface IProps {
	searchInput: string;
	category: string;
	commands: {
		name: string;
		category: string;
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
				{t(`categories.${category}`)}
			</Category>
			<Masonry
				columns={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}
				spacing={1}
				sx={{ maxWidth: theme => theme.breakpoints.values.xl }}
			>
				{commands
					.filter(command => command.name.includes(searchInput))
					.map(command => (
						<CommandCard key={command.name} name={command.name} category={t(`categories.${command.category}`)} />
					))}
			</Masonry>
		</div>
	);
}
