import useIsDesktop from '@hooks/useIsDesktop';
import DashboardSelectMenu from './DashboardSelectMenu';
import DashboardSidebar from './DashboardSidebar';

export interface DashboardItem {
	name: string;
	href: string;
}

const menuItems = [
	{ name: 'overview', href: '' },
	{ name: 'autoRoles', href: 'auto-roles' },
	{ name: 'levels', href: 'levels' },
	{ name: 'welcomeMessages', href: 'welcome' },
	{ name: 'serverLogs', href: 'logs' },
	{ name: 'reactionRoles', href: 'reaction-roles' },
	{ name: 'embedMessages', href: 'embeds' },
];

export default function DashboardMenu(): JSX.Element {
	const isDesktop = useIsDesktop();
	return isDesktop ? <DashboardSidebar items={menuItems} /> : <DashboardSelectMenu items={menuItems} />;
}
