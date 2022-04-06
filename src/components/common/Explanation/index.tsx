import { ReactNode } from 'react';

import { Badge, Tooltip } from '@mui/material';

interface IProps {
	label: string;
	children: ReactNode;
}

export default function Explanation({ label, children }: IProps): JSX.Element {
	return (
		<Tooltip title={label} placement='right'>
			<Badge badgeContent='?' overlap='circular' sx={{ color: theme => theme.colors.primary.main }}>
				{children}
			</Badge>
		</Tooltip>
	);
}
