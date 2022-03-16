import { MenuItem, styled, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { DashboardItem } from './DashboardMenu';
import DashboardMenuHeader from './DashboardMenuHeader';

interface IProps {
	items: DashboardItem[];
}

const Section = styled('section')({
	padding: '1rem',
});

export default function DashboardSelectMenu({ items }: IProps): JSX.Element {
	const { t } = useTranslation('dashboardPage');
	const { pathname, query, push } = useRouter();
	const { guildId } = query;
	const currentPath = pathname.split('/').pop();

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		push(`/dashboard/${guildId}/${e.target.value === '[guildId]' ? '' : e.target.value}`);
	};

	return (
		<Section>
			<DashboardMenuHeader />
			<TextField select fullWidth value={currentPath} onChange={handleChange} size='small'>
				{items.map(item => (
					<MenuItem key={item.name} value={item.href || '[guildId]'}>
						{t(`menu.${item.name}`)}
					</MenuItem>
				))}
			</TextField>
		</Section>
	);
}
