import { styled } from '@mui/material';

import Icon from '@components/Icon';

const ExpandIcon = styled(Icon)<{ expanded: boolean }>(({ theme, expanded }) => ({
	transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
	transition: theme.transitions.create('transform'),
}));

export default ExpandIcon;
