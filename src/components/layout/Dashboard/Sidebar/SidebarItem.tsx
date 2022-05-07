import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@mui/material';

import Icon from '@components/Icon';
import FeatureBadge from '@components/Badges/FeatureBadge';

import type { ISidebarItem } from './Sidebar';

interface IProps {
	item: ISidebarItem;
}

export default function SidebarItem({ item }: IProps): JSX.Element {
	const { t } = useTranslation('layout');
	const { pathname } = useRouter();
	const currentPath = pathname.split('/')[3] || '';
	const selected = item.href === currentPath;

	return (
		<ListItemButton
			component='li'
			selected={selected}
			dense
			sx={{
				fontWeight: theme => theme.typography[selected ? 'fontWeightBold' : 'fontWeightRegular'],
				'&.Mui-selected': {
					backgroundColor: theme => theme.colors.background.input,
				},
			}}
		>
			<ListItemIcon
				sx={{
					color: theme => theme.colors.text[selected ? 'primary' : 'secondary'],
					minWidth: '2.5rem',
				}}
			>
				<Icon
					icon={item.icon}
					sx={[
						{
							width: '1.25rem',
						},
						selected
							? {
									color: theme => theme.colors.primary[400],
							  }
							: {},
					]}
				/>
			</ListItemIcon>
			<ListItemText
				disableTypography
				sx={[
					{
						fontSize: theme => theme.typography.fontSize,
					},
				]}
			>
				{t(`dashboardSidebar.${item.name}`)}
			</ListItemText>
			{item.tags?.length ? (
				<ListItemSecondaryAction>
					{item.tags.map(tag => (
						<FeatureBadge key={tag} variant={tag} feature={item.name} />
					))}
				</ListItemSecondaryAction>
			) : undefined}
		</ListItemButton>
	);
}
