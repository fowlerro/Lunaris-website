import { useForm } from 'react-hook-form';
import { Button, styled, TextField } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';

interface FormValues {
	commandName: string;
	reason: string;
	description: string;
}

const Form = styled('form')({
	marginTop: '1rem',
	marginInline: 'auto',
	maxWidth: '25rem',
});

export default function CommandForm(): JSX.Element {
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
				label={t('forms:command.commandName')}
				error={!!errors.commandName}
				helperText={errors.commandName?.message}
				{...register('commandName', {
					required: t('forms:errors.required').toString(),
					maxLength: { value: 32, message: t('forms:errors.maxLength', { count: 32 }).toString() },
				})}
				sx={{ marginBlock: '0.5rem' }}
			/>
			<TextField
				fullWidth
				size='small'
				multiline
				minRows={4}
				maxRows={10}
				placeholder={t('forms:command.reason')}
				error={!!errors.reason}
				helperText={errors.reason?.message}
				{...register('reason', {
					required: t('forms:errors.required').toString(),
					maxLength: { value: 512, message: t('forms:errors.maxLength', { count: 512 }).toString() },
				})}
				sx={{ marginBlock: '0.5rem' }}
			/>
			<TextField
				fullWidth
				size='small'
				multiline
				minRows={6}
				maxRows={16}
				placeholder={t('forms:command.description')}
				error={!!errors.description}
				helperText={errors.description?.message}
				{...register('description', {
					required: t('forms:errors.required').toString(),
					maxLength: { value: 1024, message: t('forms:errors.maxLength', { count: 1024 }).toString() },
				})}
				sx={{ marginBlock: '0.5rem' }}
			/>
			<Button variant='contained' disabled={!isValid} type='submit' sx={{ marginBlock: '0.5rem' }}>
				{t('common:send')}
			</Button>
		</Form>
	);
}
