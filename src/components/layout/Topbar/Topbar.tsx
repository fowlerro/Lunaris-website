import { AppBar, styled } from '@mui/material';

import TopbarLinks from './TopbarLinks';
import Logo from './Logo';
import SkipNavigationLink from './SkipNavigationLink';
import Link from '@components/Link';

const Header = styled(AppBar)(({ theme }) => ({
	background: theme.colors.background.lighter,
	zIndex: theme.zIndex.drawer + 1,
	fontSize: 'clamp(1.00rem, -1.20rem + 3.13vw, 1.5rem)',
	maxWidth: '100vw',

	[theme.breakpoints.up('md')]: {
		background: 'none',
		boxShadow: 'none',
	},
}));

const Navigation = styled('nav')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',

	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 'clamp(1.00em, -1.20em + 3.13vw, 2.00em)',
	},
}));

export default function Topbar(): JSX.Element {
	return (
		<Header position='relative'>
			<SkipNavigationLink />
			<Navigation aria-label='primary'>
				<Link href='/'>
					<Logo />
				</Link>
				<TopbarLinks />
			</Navigation>
		</Header>
	);
}
