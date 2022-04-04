import LanguageSwitcher from '@components/LanguageSwitcher';
import { AppBar, Box, Toolbar } from '@mui/material';
import UserMenu from '../Topbar/UserMenu';

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
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<h1>Lunaris</h1>
				<Box display='flex'>
					<LanguageSwitcher />
					<UserMenu />
				</Box>
			</Toolbar>
		</AppBar>
	);
}
