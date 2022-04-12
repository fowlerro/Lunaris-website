import useTranslation from 'next-translate/useTranslation';

import { styled, Typography } from '@mui/material';

import CommandForm from '@components/Forms/CommandForm';

const Section = styled('section')(({ theme }) => ({
	backgroundColor: theme.colors.background.primary,
	paddingTop: '2rem',
	paddingInline: '1rem',
	textAlign: 'center',

	[theme.breakpoints.up('md')]: {
		backgroundColor: theme.colors.background.secondary,
	},
}));

export default function FormSection(): JSX.Element {
	const { t } = useTranslation();
	return (
		<Section>
			<Typography variant='h3' component='h2'>
				{t('commandsPage:form.header')}
			</Typography>
			<Typography variant='body2'>{t('commandsPage:form.paragraph')}</Typography>
			<CommandForm />
			<Typography
				variant='caption'
				paragraph
				sx={{
					textDecoration: 'underline',
					color: theme => theme.colors.text.muted,
					marginTop: '2rem',
					marginBottom: 0,
					paddingBottom: '.25rem',
				}}
			>
				{t('commandsPage:form.caption')}
			</Typography>
		</Section>
	);
}
