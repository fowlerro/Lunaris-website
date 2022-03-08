import { useState } from 'react';
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Collapse,
	IconButton,
	IconButtonProps,
	styled,
	Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	name: string;
	category: string;
}

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const StyledCard = styled(Card)(({ theme }) => ({
	backgroundColor: theme.colors.background.lighter,
	borderRadius: '8px',
}));

const List = styled('ul')({
	paddingLeft: '1.5rem',
	marginBottom: '1rem',
});

const ListItem = styled('li')({});

const Option = styled(Typography)({
	marginBlock: '0.25rem',
});

const description = 'Manage server bans';
const permissions = ['Ban Members'];
const options = {
	give: ['member', 'time (optional)', 'reason (optional)'],
	'give-by-id': ['member', 'time (optional)', 'reason (optional)'],
	remove: ['user-id', 'reason (optional)'],
	list: ['page (optional)'],
};
const examples = [
	'/ban give @Lunaris 1d being idiot',
	'/ban give-by-id 739412828737372181',
	'/ban remove 739412828737372181',
	'/ban list',
];

export default function CommandCard({ name, category }: IProps): JSX.Element {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<StyledCard>
			<CardHeader
				title={name}
				subheader={`#${category}`}
				titleTypographyProps={{ component: 'h3' }}
				subheaderTypographyProps={{ color: theme => theme.colors.text.muted, fontSize: '.85rem' }}
			/>
			<CardContent sx={{ paddingBlock: 0 }}>
				<Typography variant='body2' color={theme => theme.colors.text.secondary}>
					{description}
				</Typography>
			</CardContent>
			<CardActions disableSpacing sx={{ paddingTop: 0 }}>
				<ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more'>
					<FontAwesomeIcon icon={faChevronDown} size='sm' />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>
					<Typography variant='h6' component='h4'>
						Permissions
					</Typography>
					<Typography paragraph variant='body2'>
						{permissions.join(', ')}
					</Typography>
				</CardContent>
				<CardContent>
					<Typography variant='h6' component='h4'>
						Options
					</Typography>
					<List>
						{Object.entries(options).map(([subcommand, options]) => (
							<ListItem key={subcommand}>
								<Option paragraph variant='body2'>
									{subcommand}
								</Option>
								<List>
									{options.map(option => (
										<ListItem key={option}>
											<Option paragraph variant='body2'>
												{option}
											</Option>
										</ListItem>
									))}
								</List>
							</ListItem>
						))}
					</List>
				</CardContent>
				<CardContent>
					<Typography variant='h6' component='h4'>
						Examples
					</Typography>
					<List>
						{examples.map((example, index) => (
							<ListItem key={index}>
								<Typography paragraph variant='body2'>
									{example}
								</Typography>
							</ListItem>
						))}
					</List>
				</CardContent>
			</Collapse>
		</StyledCard>
	);
}
