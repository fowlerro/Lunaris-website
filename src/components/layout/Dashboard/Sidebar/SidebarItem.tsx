import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, styled } from '@mui/material';

import Link from '@components/Link';
import Icon from '@components/Icon';
import FeatureBadge from '@components/Badges/FeatureBadge';

import type { ISidebarItem } from './Sidebar';

interface IProps {
	item: ISidebarItem;
}

export const ItemText = styled('span')(({ theme }) => ({
	backgroundImage: `linear-gradient(to left, ${theme.colors.text.muted}, ${theme.colors.text.muted})`,
	backgroundPosition: 'bottom center',
	backgroundSize: '85% 1px',
	backgroundRepeat: 'no-repeat',
	paddingBottom: '4px',
}));

export default function SidebarItem({ item }: IProps): JSX.Element {
	const { t } = useTranslation('dashboardPage');
	const { pathname, query } = useRouter();
	const guildId = query.guildId as string;
	const currentPath = pathname.split('/')[3] || '';
	const selected = item.href === currentPath;

	return (
		<Link
			href={`/dashboard/${guildId}/${item.href}`}
			sx={{ textDecoration: 'none', color: theme => theme.colors.text.primary }}
		>
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
					sx={[
						{
							fontSize: theme => theme.typography.fontSize,
						},
					]}
				>
					{selected ? <ItemText>{t(`menu.${item.name}`)}</ItemText> : t(`menu.${item.name}`)}
				</ListItemText>
				{item.tags?.length ? (
					<ListItemSecondaryAction>
						{item.tags.map(tag => (
							<FeatureBadge key={tag} variant={tag} feature={item.name} />
						))}
					</ListItemSecondaryAction>
				) : undefined}
			</ListItemButton>
		</Link>
	);
}
