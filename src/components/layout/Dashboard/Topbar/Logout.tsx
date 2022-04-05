import { IconButton } from '@mui/material';

import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';
import Link from '@components/Link';

export default function Logout(): JSX.Element {
	return (
		<Link href={`${process.env.API_URL}/auth/logout`} sx={{ marginLeft: '1rem' }}>
			<IconButton color='error'>
				<Icon icon={faRightToBracket} />
			</IconButton>
		</Link>
	);
}
