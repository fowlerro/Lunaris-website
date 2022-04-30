import { Divider, styled } from '@mui/material';

import Modules from './Modules';
import Statistics from './Statistics';

const StyledSection = styled('section')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	flexWrap: 'wrap',

	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
	},
}));

export default function Overview(): JSX.Element {
	return (
		<>
			<StyledSection>
				<Statistics />
			</StyledSection>
			<Divider sx={{ marginBlock: '2rem' }} />
			<StyledSection>
				<Modules />
			</StyledSection>
		</>
	);
}
