import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { List, ListItemButton, listItemButtonClasses, styled } from '@mui/material';
import Link from '@components/Link';
import { DashboardItem } from './DashboardMenu';

interface IProps {
	items: DashboardItem[];
}

const Item = styled(ListItemButton)(({ theme }) => ({
	fontWeight: 500,
	padding: 0,

	[`&.${listItemButtonClasses.selected}`]: {
		fontWeight: 600,
		backgroundColor: theme.colors.background.input,
	},
}));

export default function DashboardSidebarMenu({ items }: IProps): JSX.Element {
	const { t } = useTranslation('dashboardPage');
	const { pathname, query } = useRouter();
	const { guildId } = query;
	const currentPath = pathname.split('/').pop();

	return (
		<List>
			{items.map(item => (
				<Item key={item.name} selected={item.href === currentPath || (item.href === '' && currentPath === '[guildId]')}>
					<Link
						href={`/dashboard/${guildId}/${item.href}`}
						underline='none'
						sx={{
							color: theme => theme.colors.text.primary,
							textAlign: 'center',
							width: '100%',
							paddingBlock: '.75rem',
						}}
					>
						{t(`menu.${item.name}`)}
					</Link>
				</Item>
			))}
		</List>
	);
}
