import { AppBar, Box, Toolbar } from '@mui/material';

import LanguageSwitcher from '@components/LanguageSwitcher';
import Logo from '@components/layout/Topbar/Logo';
import Link from '@components/Link';

import Logout from './Logout';
import Profile from './Profile';

export default function Topbar(): JSX.Element {
	return (
		<AppBar
			position='static'
			sx={{
				gridArea: 'topbar',
				backgroundColor: theme => theme.colors.background.lighter,
				boxShadow: theme => theme.shadows[4],
				zIndex: theme => theme.zIndex.appBar,
			}}
			elevation={0}
		>
			<Toolbar sx={{ justifyContent: 'space-between', marginBlock: 'auto' }}>
				<Link href='/'>
					<Logo />
				</Link>
				<Box display='flex' alignItems='center'>
					<LanguageSwitcher />
					<Profile />
					<Logout />
				</Box>
			</Toolbar>
		</AppBar>
	);
}
