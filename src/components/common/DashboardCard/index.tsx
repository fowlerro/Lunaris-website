import { ReactNode, useState } from 'react';

import { Paper, Box, Collapse, Typography, styled, SxProps, Theme } from '@mui/material';

import ExpandIcon from '@components/ExpandIcon';

interface IProps {
	header: string;
	initialExpand?: boolean;
	disableIcon?: boolean;
	action?: ReactNode;
	children: ReactNode;
	className?: string;
	sx?: SxProps<Theme>;
}

const Container = styled(Paper)(({ theme }) => ({
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.colors.background.lighter,
	boxShadow: theme.shadows[4],
	padding: '1rem',
}));

const Header = styled(Box)({
	display: 'flex',
	alignItems: 'center',
});

const Items = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	gap: '.5rem',
});

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
				{disableIcon ? undefined : <ExpandIcon expanded={open} onClick={() => setOpen(!open)} />}
			</Header>
			{disableIcon ? children : <Collapse in={open}>{children}</Collapse>}
		</Container>
	);
}
