import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { styled } from '@mui/material';

import Topbar from '@components/layout/Dashboard/Topbar';
import Sidebar from '@components/layout/Dashboard/Sidebar/Sidebar';
import useLastManagedServer from '@hooks/useLastManagedServer';

interface IProps {
	children: ReactNode;
}

const Section = styled('section')(({ theme }) => ({
	display: 'grid',
	height: '100vh',
	overflowY: 'hidden',
	gridTemplateColumns: 'minmax(0, 300px) auto',
	gridTemplateRows: '84px minmax(0, auto)',
	gridTemplateAreas: `'topbar topbar'
    'content content'`,

	[theme.breakpoints.up('md')]: {
		gridTemplateAreas: `'topbar topbar'
    'sidebar content'`,
	},
}));

const Content = styled('section')(({ theme }) => ({
	gridArea: 'content',
	padding: '1rem',
	overflowY: 'auto',

	[theme.breakpoints.down('md')]: {
		paddingBottom: '6rem',
	},
}));

export default function DashboardLayout({ children }: IProps): JSX.Element {
	const router = useRouter();
	const guildId = router.query.guildId as string;
	useLastManagedServer({ guildId });
	return (
		<Section>
			<Topbar />
			<Sidebar />
			<Content id='main'>{children}</Content>
		</Section>
	);
}
