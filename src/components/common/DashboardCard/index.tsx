import { ReactNode, useState } from 'react';

import { Paper, Box, Collapse, Typography, IconButton, styled, SxProps, Theme } from '@mui/material';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';

interface IProps {
	header: string;
	initialExpand?: boolean;
	disableIcon?: boolean;
	action?: ReactNode;
	children: ReactNode;
	className?: string;
	sx?: SxProps<Theme>;
}

const ArrowIcon = styled(Icon)<{ open: boolean }>(({ theme, open }) => ({
	transition: theme.transitions.create('transform'),

	transform: open ? 'rotate(180deg)' : 'rotate(0)',
}));

const Container = styled(Paper)(({ theme }) => ({
	borderRadius: theme.shape.borderRadius,
	background: theme.colors.background.lighter,
	boxShadow: theme.shadows[4],
	padding: '1rem',
}));

const Header = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'flex-start',

	[theme.breakpoints.up('lg')]: {
		alignItems: 'center',
	},
}));

const Items = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
	width: '100%',
	gap: '.5rem',

	[theme.breakpoints.up('lg')]: {
		flexDirection: 'row',
	},
}));

const Action = styled(Box)({});

export default function DashboardCard({
	header,
	initialExpand = false,
	disableIcon = false,
	action,
	children,
	className,
	sx,
}: IProps): JSX.Element {
	const [open, setOpen] = useState<boolean>(initialExpand);

	return (
		<Container elevation={0} className={className} sx={sx}>
			<Header>
				<Items>
					<Typography variant='h5' component='h2' sx={{ flex: 1 }}>
						{header}
					</Typography>
					{action && <Action>{action}</Action>}
				</Items>
				{disableIcon ? undefined : (
					<IconButton onClick={() => setOpen(!open)}>
						<ArrowIcon icon={faChevronDown} open={open} />
					</IconButton>
				)}
			</Header>
			{disableIcon ? children : <Collapse in={open}>{children}</Collapse>}
		</Container>
	);
}
