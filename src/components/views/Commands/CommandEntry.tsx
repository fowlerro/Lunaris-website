import {
	Divider,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	listItemTextClasses,
	styled,
	Typography,
} from '@mui/material';

import Icon from '@components/Icon';

import { categories } from 'src/pages/commands';
import { useRef, useState } from 'react';

interface CommandEntryProps {
	command: {
		name: string;
		category: string;
	};
}

const StyledListItemText = styled(ListItemText)({
	[`.${listItemTextClasses.primary}`]: {
		display: 'flex',
		gap: '.5rem',
		marginBlock: '.25rem',
	},
});

const StyledOption = styled('span', {
	shouldForwardProp: prop => prop !== 'pointer',
})<{ pointer?: boolean }>(({ theme, pointer }) => ({
	backgroundColor: theme.colors.background.darker,
	paddingInline: '.5rem',
	borderRadius: '4px',
	cursor: pointer ? 'pointer' : 'default',
	'&:hover': {
		backgroundColor: theme.colors.background.secondary,
	},
}));

export default function CommandEntry({ command }: CommandEntryProps): JSX.Element {
	const category = categories.find(cat => cat.value === command.category);
	const description = 'Display color';
	const ref = useRef<HTMLDivElement>(null);
	const [showSubcommands, setShowSubcommands] = useState(false);

	const handleMouseEnter = () => {
		setShowSubcommands(true);
	};
	const handleMouseLeave = () => {
		setShowSubcommands(false);
	};

	return (
		<li>
			<ListItemButton
				ref={ref}
				disableRipple
				disableTouchRipple
				sx={{ cursor: 'default' }}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{category ? (
					<ListItemIcon>
						<Icon icon={category.icon} />
					</ListItemIcon>
				) : null}
				<StyledListItemText
					primary={
						<>
							<Typography
								variant='body1'
								component='span'
								sx={{ fontWeight: theme => theme.typography.fontWeightRegular }}
							>
								/{command.name}
							</Typography>
							<StyledOption>color</StyledOption>
							<Divider orientation='vertical' flexItem />
							<span>+ 1 optional</span>
						</>
					}
					secondary={
						<>{showSubcommands ? <Subcommands subcommands={['convert', 'display']} /> : <span>{description}</span>}</>
					}
				/>
			</ListItemButton>
		</li>
	);
}

interface SubcommandsProps {
	subcommands: string[];
}

const SubcommandContainer = styled('div')({
	display: 'flex',
	gap: '.5rem',
});

function Subcommands({ subcommands }: SubcommandsProps) {
	return (
		<SubcommandContainer>
			subcommands:
			{subcommands.map(subcommand => (
				<StyledOption key={subcommand} pointer>
					{subcommand}
				</StyledOption>
			))}
		</SubcommandContainer>
	);
}
