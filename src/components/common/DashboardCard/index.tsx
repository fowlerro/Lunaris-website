import { ReactNode, useState } from 'react';
import { Paper, Box, Collapse, Typography, IconButton, styled } from '@mui/material';
import Icon from '@components/Icon';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	header: string;
	initialExpand?: boolean;
	disableIcon?: boolean;
	action?: ReactNode;
	children: ReactNode;
	className?: string;
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

export default function DashboardCard({
	header,
	initialExpand = false,
	disableIcon = false,
	action,
	children,
	className,
}: IProps): JSX.Element {
	const [open, setOpen] = useState<boolean>(initialExpand);

	return (
		<Container elevation={0} className={className}>
			<Header>
				<Typography variant='h5' component='h2'>
					{header}
				</Typography>
				<div>
					{action}
					{disableIcon ? undefined : (
						<IconButton onClick={() => setOpen(!open)}>
							<ArrowIcon icon={faChevronDown} open={open} />
						</IconButton>
					)}
				</div>
			</Header>
			{disableIcon ? children : <Collapse in={open}>{children}</Collapse>}
		</Container>
	);
}
