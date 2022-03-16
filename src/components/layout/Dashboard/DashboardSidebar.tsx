import { Paper, styled } from '@mui/material';

import { DashboardItem } from './DashboardMenu';
import DashboardMenuHeader from './DashboardMenuHeader';
import DashboardSidebarMenu from './DashboardSidebarMenu';

interface IProps {
	items: DashboardItem[];
}

const Sidebar = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.colors.background.lighter,
	borderRadius: '12px',
	minWidth: '15rem',
	maxWidth: '18rem',
	margin: '2rem',
	marginTop: 0,
	paddingBlock: '1rem',
}));

export default function DashboardSidebar({ items }: IProps): JSX.Element {
	return (
		<Sidebar elevation={0}>
			<DashboardMenuHeader />
			<DashboardSidebarMenu items={items} />
		</Sidebar>
	);
}
