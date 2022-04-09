import { useTranslation } from 'next-i18next';

import { Button, styled, Typography } from '@mui/material';

interface IProps {
	title: string;
	description: string;
	id: string;
}

const Card = styled('div')({
	maxWidth: '20rem',
	marginBottom: '5rem',
	marginInline: 'auto',
});

const StyledButton = styled(Button)({
	marginTop: '1rem',
});

export default function ModuleItem({ title, description, id }: IProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<Card id={id}>
			<Typography variant='h3' sx={{ marginBottom: '1rem' }}>
				{title}
			</Typography>
			<Typography variant='body1'>{description}</Typography>
			<StyledButton variant='outlined' size='small'>
				{t('common:readMore')}
			</StyledButton>
		</Card>
	);
}
