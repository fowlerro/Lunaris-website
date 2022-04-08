import { ReactNode, useState } from 'react';
import { useTranslation } from 'next-i18next';

import {
	Collapse,
	Divider,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
} from '@mui/material';

import Icon from '@components/Icon';
import ExpandIcon from '@components/ExpandIcon';
import FeatureBadge from '@components/Badges/FeatureBadge';

import { ItemText } from './SidebarItem';
import type { ISidebarItem } from './Sidebar';

interface IProps {
	children: ReactNode;
	item: ISidebarItem;
	selected: boolean;
}

export default function SidebarGroup({ children, item, selected }: IProps): JSX.Element {
	const [open, setOpen] = useState(true);
	const { t } = useTranslation('dashboardPage');

	return (
		<>
			<ListItemButton
				onClick={() => setOpen(!open)}
				dense
				selected={selected}
				sx={{
					'&.Mui-selected': {
						backgroundColor: theme => theme.colors.background.input,
					},
				}}
			>
				<ListItemIcon
					sx={{ minWidth: '2.5rem', color: theme => theme.colors.text[selected ? 'primary' : 'secondary'] }}
				>
					<Icon
						icon={item.icon}
						sx={[
							{
								width: '1.5rem',
							},
							selected
								? {
										'& path': {
											fill: 'url(#blue-gradient)',
										},
								  }
								: {},
						]}
					/>
				</ListItemIcon>
				<ListItemText
					disableTypography
					sx={{
						fontWeight: theme => theme.typography.fontWeightBold,
						color: theme => theme.colors.text[selected ? 'primary' : 'secondary'],
					}}
				>
					{selected ? <ItemText>{t(`menu.${item.name}`)}</ItemText> : t(`menu.${item.name}`)}
				</ListItemText>
				<ListItemSecondaryAction>
					{item.tags?.length
						? item.tags.map(tag => <FeatureBadge key={tag} variant={tag} feature={item.name} />)
						: undefined}
					{item.items?.length ? <ExpandIcon expanded={open} sx={{ width: '1rem' }} /> : undefined}
				</ListItemSecondaryAction>
			</ListItemButton>
			{item.items?.length ? (
				<Collapse in={open} unmountOnExit timeout='auto'>
					<List component='div' sx={{ paddingLeft: '1rem' }}>
						{children}
					</List>
					<Divider variant='middle' sx={{ marginLeft: '2rem' }} />
				</Collapse>
			) : undefined}
		</>
	);
}
