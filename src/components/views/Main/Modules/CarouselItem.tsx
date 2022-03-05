import { styled, Typography } from '@mui/material';
import React, { ForwardedRef, forwardRef } from 'react';

interface IProps {
	title: string;
	description: string;
	id: string;
}

const Card = styled('li')(({ theme }) => ({
	backgroundColor: theme.colors.background.lighter,
	borderRadius: '8px',
	padding: '1rem',
	paddingBottom: '3rem',
	flexShrink: 0,
	width: '80%',
	marginInline: '10%',

	scrollSnapAlign: 'center',
	scrollSnapStop: 'always',
}));

function ModuleCard({ title, description, id }: IProps, ref: ForwardedRef<HTMLLIElement>): JSX.Element {
	return (
		<Card ref={ref} id={id} aria-label={title}>
			<Typography variant='h3' sx={{ marginTop: '1.25rem', marginBottom: '1rem' }}>
				{title}
			</Typography>
			<Typography variant='subtitle1'>{description}</Typography>
		</Card>
	);
}

export default forwardRef<HTMLLIElement, IProps>(ModuleCard);
