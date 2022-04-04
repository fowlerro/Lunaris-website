import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, styled } from '@mui/material';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
	faAnglesUp,
	faAt,
	faChevronDown,
	faDoorOpen,
	faFaceGrin,
	faFileCircleQuestion,
	faPuzzlePiece,
	faSliders,
	faTachographDigital,
} from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';
import Link from '@components/Link';

import useIsDesktop from '@hooks/useIsDesktop';

interface ISidebarItemProps {
	item: ISidebarItem;
}

interface ISidebarItem {
	name: string;
	icon: IconDefinition;
	href?: string;
	group?: boolean;
	items?: ISidebarItem[];
}

const menuItems = [
	{ name: 'overview', href: '', icon: faSliders },
	{
		name: 'modules',
		group: true,
		icon: faPuzzlePiece,
		items: [
			{ name: 'autoRoles', href: 'auto-roles', icon: faAt },
			{ name: 'levels', href: 'levels', icon: faAnglesUp },
			{ name: 'welcomeMessages', href: 'welcome', icon: faDoorOpen },
			{ name: 'serverLogs', href: 'logs', icon: faFileCircleQuestion },
			{ name: 'reactionRoles', href: 'reaction-roles', icon: faFaceGrin },
			{ name: 'embedMessages', href: 'embeds', icon: faTachographDigital },
		],
	},
];

const StyledSidebar = styled(List)(({ theme }) => ({
	backgroundColor: theme.colors.background.lighter,
	gridArea: 'sidebar',
	height: '100%',
}));

const createItems = (items: ISidebarItem[]) => {
	return items.map(item => {
		if (item.group && item.items)
			return (
				<SidebarGroup key={item.name} item={item}>
					{createItems(item.items)}
				</SidebarGroup>
			);
		return <SidebarItem key={item.name} item={item} />;
	});
};

const ExpandIcon = styled(Icon)<{ expanded: boolean }>(({ theme, expanded }) => ({
	transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
	transition: theme.transitions.create('transform'),
}));

export default function Sidebar(): JSX.Element {
	const items = createItems(menuItems);
	const isDesktop = useIsDesktop();

	return isDesktop ? <StyledSidebar>{items}</StyledSidebar> : <MobileSidebar items={items} />;
}

function MobileSidebar({ items }: { items: JSX.Element[] }) {
	const [open, setOpen] = useState(false);

	return (
		<SwipeableDrawer
			anchor='left'
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			ModalProps={{
				keepMounted: true,
			}}
			PaperProps={{
				style: {
					width: '285px',
				},
			}}
		>
			<StyledSidebar>{items}</StyledSidebar>
		</SwipeableDrawer>
	);
}

function SidebarGroup({ children, item }: { children: ReactNode; item: ISidebarItem }): JSX.Element {
	const [open, setOpen] = useState(true);
	const { t } = useTranslation('dashboardPage');

	return (
		<>
			<ListItemButton onClick={() => setOpen(!open)} dense>
				<ListItemIcon>
					<Icon icon={item.icon} sx={{ width: '1.5rem' }} />
				</ListItemIcon>
				<ListItemText disableTypography>{t(`menu.${item.name}`)}</ListItemText>
				<ExpandIcon expanded={open} icon={faChevronDown} sx={{ width: '1.5rem' }} />
			</ListItemButton>
			<Collapse in={open} unmountOnExit timeout='auto'>
				<List component='div' sx={{ paddingLeft: '1rem' }}>
					{children}
				</List>
			</Collapse>
		</>
	);
}

function SidebarItem({ item }: ISidebarItemProps): JSX.Element {
	const { t } = useTranslation('dashboardPage');
	const { pathname, query } = useRouter();
	const guildId = query.guildId as string;
	const currentPath = pathname.split('/')[3] || '';

	return (
		<Link
			href={`/dashboard/${guildId}/${item.href}`}
			sx={{ textDecoration: 'none', color: theme => theme.colors.text.primary }}
		>
			<ListItemButton component='li' selected={item.href === currentPath} dense>
				<ListItemIcon>
					<Icon icon={item.icon} sx={{ width: '1.5rem' }} />
				</ListItemIcon>
				<ListItemText disableTypography>{t(`menu.${item.name}`)}</ListItemText>
			</ListItemButton>
		</Link>
	);
}
