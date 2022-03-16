import React, { ReactNode } from 'react';

import { styled } from '@mui/material';

import DashboardMenu from '@components/layout/Dashboard/DashboardMenu';

interface IProps {
	children: ReactNode;
}

const Section = styled('section')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',

	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
	},
}));

const Content = styled('section')(({ theme }) => ({
	display: 'flex',
	flexFlow: 'column',
	gap: '1rem',
	margin: '1rem',

	[theme.breakpoints.up('md')]: {
		flexFlow: 'row wrap',
		margin: 0,
		marginRight: '1rem',

		'& > *': {
			width: 'max-content',
		},
	},
}));

export default function DashboardLayout({ children }: IProps): JSX.Element {
	return (
		<Section>
			<DashboardMenu />
			<Content id='main'>{children}</Content>
		</Section>
	);
}
