import ModuleForm from '@components/Forms/ModuleForm';
import { styled, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

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
				{t('modulesPage:form.header')}
			</Typography>
			<Typography variant='body2'>{t('modulesPage:form.paragraph')}</Typography>
			<ModuleForm />
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
				{t('modulesPage:form.caption')}
			</Typography>
		</Section>
	);
}
