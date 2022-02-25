import { Dispatch, SetStateAction } from 'react';
import { IconButton } from '@mui/material';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';

import Icon from '@components/Icon';

interface IProps {
	expanded: boolean;
	setExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function Hamburger({ expanded, setExpanded }: IProps): JSX.Element {
	return (
		<IconButton
			sx={{ color: theme => theme.colors.text.primary }}
			aria-expanded={expanded}
			aria-controls='navLinks'
			onClick={() => setExpanded(!expanded)}
		>
			<Icon icon={faBars} />
		</IconButton>
	);
}
