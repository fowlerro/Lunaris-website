import { useForm } from 'react-hook-form';
import { Button, styled, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';

interface FormValues {
	email: string;
	subject: string;
	message: string;
}

const Form = styled('form')({
	marginTop: '1rem',
	marginInline: 'auto',
	maxWidth: '25rem',
});

export default function OtherForm(): JSX.Element {
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
				type='email'
				label={t('forms:other.email')}
				error={!!errors.email}
				helperText={errors.email?.message}
				{...register('email', {
					required: t('forms:errors.required').toString(),
					maxLength: { value: 256, message: t('forms:errors.maxLength', { count: 256 }).toString() },
				})}
				sx={{ marginBlock: '0.5rem' }}
			/>
			<TextField
				fullWidth
				size='small'
				placeholder={t('forms:other.subject')}
				error={!!errors.subject}
				helperText={errors.subject?.message}
				{...register('subject', {
					required: t('forms:errors.required').toString(),
					maxLength: { value: 128, message: t('forms:errors.maxLength', { count: 128 }).toString() },
				})}
				sx={{ marginBlock: '0.5rem' }}
			/>

			<TextField
				fullWidth
				size='small'
				multiline
				minRows={6}
				maxRows={16}
				placeholder={t('forms:other.message')}
				error={!!errors.message}
				helperText={errors.message?.message}
				{...register('message', {
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
