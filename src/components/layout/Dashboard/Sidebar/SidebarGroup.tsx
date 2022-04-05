import { ReactNode, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';
import ExpandIcon from '@components/ExpandIcon';

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
				{item.items?.length ? <ExpandIcon expanded={open} icon={faChevronDown} sx={{ width: '1rem' }} /> : undefined}
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
