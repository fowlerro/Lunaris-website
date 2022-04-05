import { useState } from 'react';
import { useRouter } from 'next/router';

import { List, SwipeableDrawer, styled, useTheme } from '@mui/material';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
	faAnglesUp,
	faAt,
	faDoorOpen,
	faFaceGrin,
	faFileCircleQuestion,
	faPuzzlePiece,
	faSliders,
	faTachographDigital,
} from '@fortawesome/free-solid-svg-icons';

import Link from '@components/Link';
import useIsDesktop from '@hooks/useIsDesktop';

import SidebarItem from './SidebarItem';
import SidebarGroup from './SidebarGroup';
import ServerHeader from './ServerHeader';

const tags = ['premium', 'new', 'wip'] as const;

export type ISidebarItem = {
	name: string;
	icon: IconDefinition;
	href?: string;
	group?: boolean;
	items?: ISidebarItem[];
	tags?: typeof tags[number][];
};

const StyledSidebar = styled(List)(({ theme }) => ({
	backgroundColor: theme.colors.background.lighter,
	gridArea: 'sidebar',
	height: '100%',
}));

const menuItems: ISidebarItem[] = [
	{ name: 'overview', href: '', icon: faSliders, group: true, items: [] },
	{
		name: 'modules',
		group: true,
		icon: faPuzzlePiece,
		items: [
			{ name: 'welcomeMessages', href: 'welcome', icon: faDoorOpen, tags: ['wip'] },
			{ name: 'autoRoles', href: 'auto-roles', icon: faAt },
			{ name: 'levels', href: 'levels', icon: faAnglesUp, tags: ['premium'] },
			{ name: 'reactionRoles', href: 'reaction-roles', icon: faFaceGrin, tags: ['wip'] },
			{ name: 'embedMessages', href: 'embeds', icon: faTachographDigital, tags: ['new'] },
			{ name: 'serverLogs', href: 'logs', icon: faFileCircleQuestion },
		],
	},
];

const createItems = (items: ISidebarItem[]) => {
	return items.map(item => {
		if (item.group && item.items) {
			const { pathname, query } = useRouter();
			const guildId = query.guildId as string;
			const currentPath = pathname.split('/')[3] || '';
			const selected = item.items.length ? item.items.some(i => i.href === currentPath) : item.href === currentPath;
			return typeof item.href === 'string' ? (
				<Link
					href={`/dashboard/${guildId}/${item.href}`}
					sx={{ textDecoration: 'none', color: theme => theme.colors.text.primary }}
				>
					<SidebarGroup key={item.name} item={item} selected={selected}>
						{createItems(item.items)}
					</SidebarGroup>
				</Link>
			) : (
				<SidebarGroup key={item.name} item={item} selected={selected}>
					{createItems(item.items)}
				</SidebarGroup>
			);
		}
		return <SidebarItem key={item.name} item={item} />;
	});
};

export default function Sidebar(): JSX.Element {
	const theme = useTheme();
	const isDesktop = useIsDesktop();
	const items = createItems(menuItems);

	return (
		<>
			<svg width='0' height='0' style={{ position: 'absolute' }}>
				<defs>
					<linearGradient id='blue-gradient' x1='100%' y1='100%' x2='0%' y2='0%'>
						<stop stopColor={theme.colors.primary[600]} offset='0%' />
						<stop stopColor={theme.colors.primary[300]} offset='100%' />
					</linearGradient>
				</defs>
			</svg>
			{isDesktop ? (
				<StyledSidebar>
					<ServerHeader />
					{items}
				</StyledSidebar>
			) : (
				<MobileSidebar items={items} />
			)}
		</>
	);
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
			<StyledSidebar>
				<ServerHeader />
				{items}
			</StyledSidebar>
		</SwipeableDrawer>
	);
}
