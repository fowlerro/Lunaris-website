import { Button, styled, Typography } from '@mui/material';

interface IProps {
	title: string;
	description: string;
	id: string;
}

const Card = styled('div')({
	textAlign: 'left',
	maxWidth: '20rem',
	marginBottom: '5rem',
	marginLeft: '15%',
	':nth-of-type(even)': {
		marginLeft: '60%',
	},
});

const StyledButton = styled(Button)({
	marginTop: '1rem',
});

export default function ModuleItem({ title, description, id }: IProps): JSX.Element {
	return (
		<Card id={id}>
			<Typography variant='h3' sx={{ marginBottom: '1rem' }}>
				{title}
			</Typography>
			<Typography variant='body1'>{description}</Typography>
			<StyledButton variant='outlined' size='small'>
				Read more
			</StyledButton>
		</Card>
	);
}
