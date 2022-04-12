import { useForm } from 'react-hook-form';
import { Button, styled, TextField } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';

interface FormValues {
	title: string;
	description: string;
}

const Form = styled('form')({
	marginTop: '1rem',
	marginInline: 'auto',
	maxWidth: '25rem',
});

export default function BugReportForm(): JSX.Element {
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormValues>({
		mode: 'onChange',
		reValidateMode: 'onChange',
	});

	return (
		<Form
			onSubmit={handleSubmit(values => {
				console.log(values);
				reset();
			})}
		>
			<TextField
				fullWidth
				size='small'
				label={t('forms:bug.title')}
				error={!!errors.title}
				helperText={errors.title?.message}
				{...register('title', {
					required: t('forms:errors.required').toString(),
					maxLength: { value: 256, message: t('forms:errors.maxLength', { count: 256 }).toString() },
				})}
				sx={{ marginBlock: '0.5rem' }}
			/>
			<TextField
				fullWidth
				size='small'
				multiline
				minRows={6}
				maxRows={16}
				placeholder={t('forms:bug.description')}
				error={!!errors.description}
				helperText={errors.description?.message}
				{...register('description', {
					required: t('forms:errors.required').toString(),
					maxLength: { value: 4096, message: t('forms:errors.maxLength', { count: 4096 }).toString() },
				})}
				sx={{ marginBlock: '0.5rem' }}
			/>
			<Button variant='contained' disabled={!isValid} type='submit' sx={{ marginBlock: '0.5rem' }}>
				{t('common:send')}
			</Button>
		</Form>
	);
}
