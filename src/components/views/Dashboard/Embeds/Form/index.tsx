import { useState } from 'react';

import { useFieldArray, Control, Controller, UseFormRegister, UseFieldArrayRemove, FieldErrors } from 'react-hook-form';

import {
	Paper,
	InputLabel,
	FormControlLabel,
	Checkbox,
	Box,
	Button,
	IconButton,
	Tooltip,
	Divider,
	PaperProps,
	styled,
} from '@mui/material';
import { DateTimePicker } from '@mui/lab';

import { faCirclePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import TextField from '@components/Inputs/TextField';
import ColorPicker from '@components/ColorPicker';
import Icon from '@components/Icon';

import { EMBED_LIMITS } from '@utils/utils';
import { colors } from '@styles/theme';

import type { EmbedMessage } from 'types';
import ConfirmDialog from '@components/Dialogs/ConfirmDialog';
import { useTranslation } from 'next-i18next';

interface IProps {
	register: UseFormRegister<EmbedMessage>;
	control: Control<EmbedMessage>;
	errors: FieldErrors<EmbedMessage>;
}

interface IInputGroupProps {
	register: UseFormRegister<EmbedMessage>;
	errors: FieldErrors<EmbedMessage>;
}

interface IFooterProps {
	register: UseFormRegister<EmbedMessage>;
	control: Control<EmbedMessage>;
	errors: FieldErrors<EmbedMessage>;
}

interface ITimestampProps {
	control: Control<EmbedMessage>;
}
interface IFieldProps {
	index: number;
	control: Control<EmbedMessage>;
	errors: FieldErrors<EmbedMessage>;
	register: UseFormRegister<EmbedMessage>;
	remove: UseFieldArrayRemove;
}

const Wrapper = styled((props: PaperProps) => {
	return <Paper elevation={0} {...props} />;
})(({ theme }) => ({
	backgroundColor: theme.colors.background.secondary,
	padding: '1rem',
	marginBlock: '1rem',
}));

export default function EmbedForm({ register, control, errors }: IProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<form style={{ marginTop: '1rem' }}>
			<TextField
				characterLimit={EMBED_LIMITS.messageContent}
				fullWidth
				multiline
				minRows={4}
				maxRows={8}
				margin={'normal'}
				label={t('dashboardPage:embeds.form.labels.messageContent')}
				error={Boolean(errors.messageContent)}
				helperText={errors.messageContent?.message}
				{...register('messageContent')}
			/>
			<Controller
				name='embed.hexColor'
				control={control}
				defaultValue={colors.primary.main as EmbedMessage['embed']['hexColor']}
				render={({ field }) => (
					<ColorPicker placement='bottom-start' color={field.value} onChange={color => field.onChange(color)} />
				)}
			/>

			<Author register={register} errors={errors} />
			<Title register={register} errors={errors} />

			<TextField
				characterLimit={EMBED_LIMITS.description}
				fullWidth
				multiline
				minRows={4}
				maxRows={12}
				label={t('dashboardPage:embeds.form.labels.description')}
				margin='normal'
				error={Boolean(errors.embed?.description)}
				helperText={errors.embed?.description?.message}
				{...register('embed.description')}
			/>

			<Fields control={control} register={register} errors={errors} />

			<TextField
				fullWidth
				label={t('dashboardPage:embeds.form.labels.thumbnail')}
				margin='normal'
				{...register('embed.thumbnail.url')}
				error={Boolean(errors.embed?.thumbnail?.url)}
				helperText={errors.embed?.thumbnail?.url?.message}
			/>
			<TextField
				fullWidth
				label={t('dashboardPage:embeds.form.labels.image')}
				margin='normal'
				{...register('embed.image.url')}
				error={Boolean(errors.embed?.image?.url)}
				helperText={errors.embed?.image?.url?.message}
			/>

			<Footer register={register} control={control} errors={errors} />
		</form>
	);
}

function Author({ register, errors }: IInputGroupProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<Wrapper>
			<InputLabel sx={{ fontSize: '1.25rem' }}>{t('dashboardPage:embeds.form.labels.author')}</InputLabel>
			<TextField
				fullWidth
				label={t('dashboardPage:embeds.form.labels.authorName')}
				margin='dense'
				error={Boolean(errors.embed?.author?.name)}
				characterLimit={EMBED_LIMITS.author}
				helperText={errors.embed?.author?.name?.message}
				{...register('embed.author.name')}
			/>
			<TextField
				fullWidth
				label={t('dashboardPage:embeds.form.labels.url')}
				margin='dense'
				size='small'
				error={Boolean(errors.embed?.author?.url)}
				helperText={errors.embed?.author?.url?.message}
				{...register('embed.author.url')}
			/>
			<TextField
				fullWidth
				label={t('dashboardPage:embeds.form.labels.iconURL')}
				margin='dense'
				size='small'
				error={Boolean(errors.embed?.author?.iconURL)}
				helperText={errors.embed?.author?.iconURL?.message}
				{...register('embed.author.iconURL')}
			/>
		</Wrapper>
	);
}

function Title({ register, errors }: IInputGroupProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<Wrapper>
			<InputLabel sx={{ fontSize: '1.25rem' }}>{t('dashboardPage:embeds.form.labels.title')}</InputLabel>
			<TextField
				fullWidth
				label={t('dashboardPage:embeds.form.labels.title')}
				margin='dense'
				error={Boolean(errors.embed?.title)}
				helperText={errors.embed?.title?.message}
				characterLimit={EMBED_LIMITS.title}
				{...register('embed.title')}
			/>
			<TextField
				fullWidth
				label={t('dashboardPage:embeds.form.labels.url')}
				margin='dense'
				size='small'
				error={Boolean(errors.embed?.url)}
				helperText={errors.embed?.url?.message}
				{...register('embed.url')}
			/>
		</Wrapper>
	);
}

function Fields({ control, register, errors }: IProps): JSX.Element {
	const { t } = useTranslation();
	const { fields, append, remove } = useFieldArray<EmbedMessage>({
		control,
		name: 'embed.fields',
	});

	return (
		<Box sx={{ marginBlock: '1rem' }}>
			<Divider variant='middle'>{t('dashboardPage:embeds.form.labels.fields')}</Divider>
			{fields.map((field, index) => (
				<Field key={field.id} index={index} control={control} register={register} remove={remove} errors={errors} />
			))}
			<Button
				variant='contained'
				startIcon={<Icon icon={faCirclePlus} />}
				disabled={fields.length >= 25}
				onClick={() => append({ name: '', value: '', inline: false })}
				sx={{ marginBottom: '1rem' }}
			>
				{t('dashboardPage:embeds.form.buttons.addField')}
			</Button>
			<Divider variant='middle' />
		</Box>
	);
}

function Field({ index, control, register, remove, errors }: IFieldProps): JSX.Element {
	const { t } = useTranslation();
	const [openConfirmation, setOpenConfirmation] = useState(false);

	const handleOpen = () => setOpenConfirmation(true);
	const handleClose = () => setOpenConfirmation(false);

	const handleDelete = () => {
		handleClose();
		remove(index);
	};

	return (
		<Wrapper>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<InputLabel sx={{ fontSize: '1.25rem', fontWeight: 400 }}>{`${t('dashboardPage:embeds.form.labels.field')} ${
					index + 1
				}`}</InputLabel>
				<Tooltip title={t('dashboardPage:embeds.form.labels.removeField').toString()}>
					<IconButton color='error' sx={{ width: '3rem', height: '3rem' }} onClick={handleOpen}>
						<Icon icon={faCircleXmark} />
					</IconButton>
				</Tooltip>
			</Box>
			<TextField
				fullWidth
				label={t('dashboardPage:embeds.form.labels.fieldName')}
				margin='dense'
				error={Boolean(errors.embed?.fields?.[index]?.name)}
				helperText={errors.embed?.fields?.[index]?.name?.message}
				characterLimit={EMBED_LIMITS.field.name}
				{...register(`embed.fields.${index}.name`)}
			/>
			<TextField
				fullWidth
				multiline
				minRows={3}
				maxRows={6}
				label={t('dashboardPage:embeds.form.labels.fieldValue')}
				margin='dense'
				error={Boolean(errors.embed?.fields?.[index]?.value)}
				helperText={errors.embed?.fields?.[index]?.value?.message}
				characterLimit={EMBED_LIMITS.field.value}
				{...register(`embed.fields.${index}.value`)}
			/>
			<Controller
				name={`embed.fields.${index}.inline`}
				control={control}
				render={({ field }) => (
					<FormControlLabel
						control={<Checkbox checked={field.value} onChange={field.onChange} />}
						label={t('dashboardPage:embeds.form.labels.fieldInline').toString()}
					/>
				)}
			/>

			<ConfirmDialog
				open={openConfirmation}
				onClose={handleClose}
				onConfirm={handleDelete}
				title={t('dashboardPage:embeds.confirmFieldDeletion')}
			/>
		</Wrapper>
	);
}

function Footer({ register, control, errors }: IFooterProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<Wrapper>
			<InputLabel sx={{ fontSize: '1.25rem' }}>{t('dashboardPage:embeds.form.labels.footer')}</InputLabel>
			<TextField
				fullWidth
				label={t('dashboardPage:embeds.form.labels.footerText')}
				margin='dense'
				error={Boolean(errors.embed?.footer?.text)}
				helperText={errors.embed?.footer?.text?.message}
				characterLimit={EMBED_LIMITS.footer}
				{...register('embed.footer.text')}
			/>
			<TextField
				fullWidth
				label={t('dashboardPage:embeds.form.labels.iconURL')}
				margin='dense'
				size='small'
				error={Boolean(errors.embed?.footer?.iconURL)}
				helperText={errors.embed?.footer?.iconURL?.message}
				{...register('embed.footer.iconURL')}
			/>
			<Timestamp control={control} />
		</Wrapper>
	);
}

function Timestamp({ control }: ITimestampProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<Controller
			name='embed.timestamp'
			control={control}
			render={({ field, fieldState }) => (
				<DateTimePicker
					mask='__.__.____ __:__'
					label={t('dashboardPage:embeds.form.labels.timestamp')}
					value={field.value ? new Date(field.value) : null}
					onChange={value => field.onChange(value?.valueOf())}
					renderInput={params => (
						<TextField
							error={fieldState.invalid}
							helperText={fieldState.invalid ? fieldState.error?.message : null}
							margin='normal'
							fullWidth
							{...params}
						/>
					)}
				/>
			)}
		/>
	);
}
