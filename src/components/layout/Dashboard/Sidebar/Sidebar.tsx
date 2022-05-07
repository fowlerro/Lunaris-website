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
import ServerListButton from './ServerListButton';
import useGuildId from '@hooks/useGuildId';

export const featureBadges = ['premium', 'new', 'wip'] as const;

export type ISidebarItem = {
	name: string;
	icon: IconDefinition;
	href?: string;
	group?: boolean;
	items?: ISidebarItem[];
	tags?: typeof featureBadges[number][];
};

const StyledSidebar = styled(List)(({ theme }) => ({
	backgroundColor: theme.colors.background.lighter,
	gridArea: 'sidebar',
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
}));

const BottomSection = styled('div')({
	marginTop: 'auto',
});

const StyledLink = styled(Link)(({ theme }) => ({
	textDecoration: 'none',
	color: theme.colors.text.primary,
}));

const menuItems: ISidebarItem[] = [
	{ name: 'overview', href: '', icon: faSliders, group: true, items: [] },
	{
		name: 'modules',
		group: true,
		icon: faPuzzlePiece,
		items: [
			{ name: 'welcomeMessages', icon: faDoorOpen, tags: ['wip'] },
			{ name: 'autoRoles', href: 'auto-roles', icon: faAt },
			{ name: 'levels', href: 'levels', icon: faAnglesUp },
			{ name: 'interactiveRoles', href: 'interactive-roles', icon: faFaceGrin, tags: ['new'] },
			{ name: 'embedMessages', href: 'embeds', icon: faTachographDigital },
			{ name: 'serverLogs', href: 'logs', icon: faFileCircleQuestion },
		],
	},
];

const createItems = (items: ISidebarItem[]) => {
	return items.map(item => {
		const guildId = useGuildId();
		if (item.group && item.items) {
			const { pathname } = useRouter();
			const currentPath = pathname.split('/')[3] || '';
			const selected = item.items.length ? item.items.some(i => i.href === currentPath) : item.href === currentPath;

			return typeof item.href === 'string' ? (
				<StyledLink key={item.name} href={`/dashboard/${guildId}/${item.href}`}>
					<SidebarGroup item={item} selected={selected}>
						{createItems(item.items)}
					</SidebarGroup>
				</StyledLink>
			) : (
				<SidebarGroup key={item.name} item={item} selected={selected}>
					{createItems(item.items)}
				</SidebarGroup>
			);
		}
		return typeof item.href === 'string' ? (
			<StyledLink key={item.name} href={`/dashboard/${guildId}/${item.href}`}>
				<SidebarItem item={item} />
			</StyledLink>
		) : (
			<SidebarItem key={item.name} item={item} />
		);
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
					<List>{items}</List>
					<BottomSection>
						<ServerListButton />
					</BottomSection>
				</StyledSidebar>
			) : (
				<MobileSidebar items={items} />
			)}
		</>
	);
}

function MobileSidebar({ items }: { items: JSX.Element[] }) {
	const [open, setOpen] = useState(false);
	const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

	return (
		<SwipeableDrawer
			swipeAreaWidth={50}
			disableBackdropTransition={!iOS}
			disableDiscovery={iOS}
			anchor='left'
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			onClick={() => setOpen(false)}
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
				<List>{items}</List>
				<BottomSection>
					<ServerListButton />
				</BottomSection>
			</StyledSidebar>
		</SwipeableDrawer>
	);
}
