import { Card, CardContent, CardHeader, styled, Typography } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';

interface IProps {
	module: string;
	commands: string[];
}

const StyledCard = styled(Card)(({ theme }) => ({
	backgroundColor: theme.colors.background.lighter,
	borderRadius: '8px',
}));

const List = styled('ul')({
	paddingLeft: '1.5rem',
	marginBottom: '1rem',
});

const ListItem = styled('li')({});

const Option = styled(Typography)({
	marginBlock: '0.25rem',
});

export default function ModuleCard({ module, commands }: IProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<StyledCard>
			<CardHeader title={t(`modules:${module}.title`)} titleTypographyProps={{ component: 'h3' }} />
			<CardContent sx={{ paddingBlock: 0 }}>
				<Typography variant='body2' color={theme => theme.colors.text.secondary}>
					{t(`modules:${module}.shortDesc`)}
				</Typography>
			</CardContent>
			<CardContent>
				<Typography variant='h6' component='h4'>
					Commands
				</Typography>
				<List>
					{commands.length ? (
						commands.map(command => (
							<ListItem key={command}>
								<Option paragraph variant='body2'>
									{command}
								</Option>
							</ListItem>
						))
					) : (
						<ListItem>{t('common:comingSoon')}</ListItem>
					)}
				</List>
			</CardContent>
		</StyledCard>
	);
}
