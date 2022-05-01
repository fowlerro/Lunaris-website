import { ReactNode, useState } from 'react';

import { Paper, Box, Collapse, Typography, styled, SxProps, Theme } from '@mui/material';

import ExpandIcon from '@components/ExpandIcon';

interface IProps {
	header: string | ReactNode;
	initialExpand?: boolean;
	expand?: boolean;
	disableIcon?: boolean;
	action?: ReactNode;
	disabled?: boolean;
	children: ReactNode;
	className?: string;
	sx?: SxProps<Theme>;
}

const Card = styled(Paper, {
	shouldForwardProp: prop => prop !== 'disabled',
})<{ disabled: boolean }>(({ theme, disabled }) => ({
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.colors.background.lighter,
	boxShadow: theme.shadows[4],
	padding: '1rem',
	cursor: disabled ? 'not-allowed' : 'auto',
	display: 'flex',
	flexDirection: 'column',
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

export const DashboardCardContainer = styled('div')({
	marginTop: '1rem',
	flex: 1,
});

export default function DashboardCard({
	header,
	initialExpand = false,
	expand,
	disableIcon = false,
	action,
	disabled = false,
	children,
	className,
	sx,
}: IProps): JSX.Element {
	const [open, setOpen] = useState<boolean>(initialExpand);

	return (
		<Card elevation={0} className={className} sx={sx} disabled={disabled}>
			<Header>
				<Items>
					<Typography
						variant='h5'
						component='h2'
						sx={{
							flex: 1,
							color: theme => theme.colors.text[disabled ? 'muted' : 'primary'],
							display: 'flex',
							gap: '.5rem',
						}}
					>
						{header}
					</Typography>
					{action && <Action>{action}</Action>}
				</Items>
				{typeof expand === 'boolean' || disableIcon ? undefined : (
					<ExpandIcon
						expanded={open}
						onClick={() => setOpen(!open)}
						sx={{
							pointerEvents: disabled ? 'none' : 'auto',
							color: theme => theme.colors.text[disabled ? 'muted' : 'primary'],
							marginLeft: [0, '1rem'],
						}}
					/>
				)}
			</Header>
			{disableIcon ? children : <Collapse in={expand ?? open}>{children}</Collapse>}
		</Card>
	);
}
