import { IconButton, IconButtonProps, styled } from '@mui/material';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';

type ExpandProps = {
	expanded: boolean;
} & IconButtonProps;

const ExpandIcon = styled(
	(props: ExpandProps) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { expanded, ...rest } = props;
		return (
			<IconButton {...rest}>
				<Icon icon={faChevronDown} />
			</IconButton>
		);
	},
	{
		shouldForwardProp: prop => prop !== 'expanded',
	}
)<{ expanded: boolean }>(({ theme, expanded }) => ({
	transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
	transition: theme.transitions.create('transform'),
}));

export default ExpandIcon;
