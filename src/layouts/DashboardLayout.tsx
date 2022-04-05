import { ReactNode } from 'react';

import { styled } from '@mui/material';

import Topbar from '@components/layout/Dashboard/Topbar';
import Sidebar from '@components/layout/Dashboard/Sidebar/Sidebar';

interface IProps {
	children: ReactNode;
}

const Section = styled('section')(({ theme }) => ({
	display: 'grid',
	height: '100vh',
	gridTemplateColumns: '300px auto',
	gridTemplateRows: '84px auto',
	gridTemplateAreas: `'topbar topbar'
    'content content'`,

	[theme.breakpoints.up('md')]: {
		gridTemplateAreas: `'topbar topbar'
    'sidebar content'`,
	},
}));

const Content = styled('section')({
	gridArea: 'content',
	padding: '1rem',
	overflowY: 'auto',
});

export default function DashboardLayout({ children }: IProps): JSX.Element {
	return (
		<Section>
			<Topbar />
			<Sidebar />
			<Content id='main'>{children}</Content>
		</Section>
	);
}
