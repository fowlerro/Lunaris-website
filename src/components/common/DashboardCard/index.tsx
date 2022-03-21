import { ReactNode, useState } from 'react';
import { Paper, Box, Collapse, Typography, IconButton, styled } from '@mui/material';
import Icon from '@components/Icon';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	header: string;
	initialExpand?: boolean;
	action?: ReactNode;
	children: ReactNode;
}

const ArrowIcon = styled(Icon)<{ open: boolean }>(({ theme, open }) => ({
	transition: theme.transitions.create('transform'),

	transform: open ? 'rotate(180deg)' : 'rotate(0)',
}));

const Container = styled(Paper)(({ theme }) => ({
	borderRadius: '8px',
	background: theme.colors.background.lighter,
	boxShadow: theme.shadows[3],
	padding: '1rem',
}));

const Header = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
});

export default function DashboardCard({ header, initialExpand, action, children }: IProps): JSX.Element {
	const [open, setOpen] = useState<boolean>(initialExpand || false);

	return (
		<Container elevation={0}>
			<Header>
				<Typography variant='h5' component='h2'>
					{header}
				</Typography>
				<div>
					{action}
					<IconButton onClick={() => setOpen(!open)}>
						<ArrowIcon icon={faChevronDown} open={open} />
					</IconButton>
				</div>
			</Header>
			<Collapse in={open}>{children}</Collapse>
		</Container>
	);
}
