import { ReactNode } from 'react';

import { Badge, Tooltip } from '@mui/material';

interface IProps {
	label: string;
	children: ReactNode;
	overlap?: boolean;
}

export default function Explanation({ label, children, overlap = false }: IProps): JSX.Element {
	return (
		<Tooltip title={label} placement='right'>
			<Badge
				badgeContent='?'
				overlap={overlap ? 'rectangular' : 'circular'}
				sx={{ color: theme => theme.colors.primary.main }}
			>
				{children}
			</Badge>
		</Tooltip>
	);
}
