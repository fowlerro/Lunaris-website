import { useState } from 'react';

import { useFieldArray, Control, Controller, UseFieldArrayRemove } from 'react-hook-form';

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
import useTranslation from 'next-translate/useTranslation';
import ControlledTextField from '@components/Inputs/Controlled/TextField';

interface IProps {
	control: Control<EmbedMessage>;
}

interface IFieldProps {
	index: number;
	control: Control<EmbedMessage>;
	remove: UseFieldArrayRemove;
}

const Wrapper = styled((props: PaperProps) => {
	return <Paper elevation={0} {...props} />;
})(({ theme }) => ({
	backgroundColor: theme.colors.background.secondary,
	padding: '1rem',
	marginBlock: '1rem',
}));

export default function EmbedForm({ control }: IProps): JSX.Element {
	const { t } = useTranslation('embedsPage');
	return (
		<form style={{ marginTop: '1rem' }}>
			{/* <TextField
				characterLimit={EMBED_LIMITS.messageContent}
				fullWidth
				multiline
				minRows={4}
				maxRows={8}
				margin={'normal'}
				label={t('form.labels.messageContent')}
				error={Boolean(errors.messageContent)}
				helperText={errors.messageContent?.message}
				{...register('messageContent')}
			/> */}
			<ControlledTextField
				name='messageContent'
				control={control}
				inputProps={{
					characterLimit: EMBED_LIMITS.messageContent,
					fullWidth: true,
					multiline: true,
					minRows: 4,
					maxRows: 8,
					label: t('form.labels.messageContent'),
					margin: 'normal',
				}}
			/>
			<Controller
				name='embed.hexColor'
				control={control}
				defaultValue={colors.primary.main as EmbedMessage['embed']['hexColor']}
				render={({ field }) => (
					<ColorPicker placement='bottom-start' color={field.value} onChange={color => field.onChange(color)} />
				)}
			/>

			<Author control={control} />
			<Title control={control} />

			{/* <TextField
				characterLimit={EMBED_LIMITS.description}
				fullWidth
				multiline
				minRows={4}
				maxRows={12}
				label={t('form.labels.description')}
				margin='normal'
				error={Boolean(errors.embed?.description)}
				helperText={errors.embed?.description?.message}
				{...register('embed.description')}
			/> */}
			<ControlledTextField
				name='embed.description'
				control={control}
				inputProps={{
					characterLimit: EMBED_LIMITS.description,
					fullWidth: true,
					multiline: true,
					minRows: 4,
					maxRows: 12,
					label: t('form.labels.description'),
					margin: 'normal',
				}}
			/>

			<Fields control={control} />

			{/* <TextField
				fullWidth
				label={t('form.labels.thumbnail')}
				margin='normal'
				{...register('embed.thumbnail.url')}
				error={Boolean(errors.embed?.thumbnail?.url)}
				helperText={errors.embed?.thumbnail?.url?.message}
			/> */}
			<ControlledTextField
				name='embed.thumbnail.url'
				control={control}
				inputProps={{
					fullWidth: true,
					label: t('form.labels.thumbnail'),
					margin: 'normal',
				}}
			/>
			{/* <TextField
				fullWidth
				label={t('form.labels.image')}
				margin='normal'
				{...register('embed.image.url')}
				error={Boolean(errors.embed?.image?.url)}
				helperText={errors.embed?.image?.url?.message}
			/> */}
			<ControlledTextField
				name='embed.image.url'
				control={control}
				inputProps={{
					fullWidth: true,
					label: t('form.labels.image'),
					margin: 'normal',
				}}
			/>

			<Footer control={control} />
		</form>
	);
}

function Author({ control }: IProps): JSX.Element {
	const { t } = useTranslation('embedsPage');
	return (
		<Wrapper>
			<InputLabel sx={{ fontSize: '1.25rem' }}>{t('form.labels.author')}</InputLabel>
			{/* <TextField
				fullWidth
				label={t('form.labels.authorName')}
				margin='dense'
				error={Boolean(errors.embed?.author?.name)}
				characterLimit={EMBED_LIMITS.author}
				helperText={errors.embed?.author?.name?.message}
				{...register('embed.author.name')}
			/> */}
			<ControlledTextField
				name='embed.author.name'
				control={control}
				inputProps={{
					characterLimit: EMBED_LIMITS.author,
					fullWidth: true,
					label: t('form.labels.authorName'),
					margin: 'dense',
				}}
			/>
			{/* <TextField
				fullWidth
				label={t('form.labels.url')}
				margin='dense'
				size='small'
				error={Boolean(errors.embed?.author?.url)}
				helperText={errors.embed?.author?.url?.message}
				{...register('embed.author.url')}
			/> */}
			<ControlledTextField
				name='embed.author.url'
				control={control}
				inputProps={{
					fullWidth: true,
					label: t('form.labels.url'),
					margin: 'dense',
					size: 'small',
				}}
			/>
			{/* <TextField
				fullWidth
				label={t('form.labels.iconURL')}
				margin='dense'
				size='small'
				error={Boolean(errors.embed?.author?.iconURL)}
				helperText={errors.embed?.author?.iconURL?.message}
				{...register('embed.author.iconURL')}
			/> */}
			<ControlledTextField
				name='embed.author.iconURL'
				control={control}
				inputProps={{
					fullWidth: true,
					label: t('form.labels.iconURL'),
					margin: 'dense',
					size: 'small',
				}}
			/>
		</Wrapper>
	);
}

function Title({ control }: IProps): JSX.Element {
	const { t } = useTranslation('embedsPage');
	return (
		<Wrapper>
			<InputLabel sx={{ fontSize: '1.25rem' }}>{t('form.labels.title')}</InputLabel>
			{/* <TextField
				fullWidth
				label={t('form.labels.title')}
				margin='dense'
				error={Boolean(errors.embed?.title)}
				helperText={errors.embed?.title?.message}
				characterLimit={EMBED_LIMITS.title}
				{...register('embed.title')}
			/> */}
			<ControlledTextField
				name='embed.title'
				control={control}
				inputProps={{
					characterLimit: EMBED_LIMITS.title,
					fullWidth: true,
					label: t('form.labels.title'),
					margin: 'dense',
				}}
			/>
			{/* <TextField
				fullWidth
				label={t('form.labels.url')}
				margin='dense'
				size='small'
				error={Boolean(errors.embed?.url)}
				helperText={errors.embed?.url?.message}
				{...register('embed.url')}
			/> */}
			<ControlledTextField
				name='embed.url'
				control={control}
				inputProps={{
					fullWidth: true,
					label: t('form.labels.url'),
					margin: 'dense',
					size: 'small',
				}}
			/>
		</Wrapper>
	);
}

function Fields({ control }: IProps): JSX.Element {
	const { t } = useTranslation('embedsPage');
	const { fields, append, remove } = useFieldArray<EmbedMessage>({
		control,
		name: 'embed.fields',
	});

	return (
		<Box sx={{ marginBlock: '1rem' }}>
			<Divider variant='middle'>{t('form.labels.fields')}</Divider>
			{fields.map((field, index) => (
				<Field key={field.id} index={index} control={control} remove={remove} />
			))}
			<Button
				variant='contained'
				startIcon={<Icon icon={faCirclePlus} />}
				disabled={fields.length >= 25}
				onClick={() => append({ name: '', value: '', inline: false })}
				sx={{ marginBottom: '1rem' }}
			>
				{t('form.buttons.addField')}
			</Button>
			<Divider variant='middle' />
		</Box>
	);
}

function Field({ index, control, remove }: IFieldProps): JSX.Element {
	const { t } = useTranslation('embedsPage');
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
				<InputLabel sx={{ fontSize: '1.25rem', fontWeight: 400 }}>{`${t('form.labels.field')} ${
					index + 1
				}`}</InputLabel>
				<Tooltip title={t('form.labels.removeField').toString()}>
					<IconButton color='error' sx={{ width: '3rem', height: '3rem' }} onClick={handleOpen}>
						<Icon icon={faCircleXmark} />
					</IconButton>
				</Tooltip>
			</Box>
			{/* <TextField
				fullWidth
				label={t('form.labels.fieldName')}
				margin='dense'
				error={Boolean(errors.embed?.fields?.[index]?.name)}
				helperText={errors.embed?.fields?.[index]?.name?.message}
				characterLimit={EMBED_LIMITS.field.name}
				{...register(`embed.fields.${index}.name`)}
			/> */}
			<ControlledTextField
				name={`embed.fields.${index}.name`}
				control={control}
				inputProps={{
					characterLimit: EMBED_LIMITS.field.name,
					fullWidth: true,
					label: t('form.labels.fieldName'),
					margin: 'dense',
				}}
			/>
			{/* <TextField
				fullWidth
				multiline
				minRows={3}
				maxRows={6}
				label={t('form.labels.fieldValue')}
				margin='dense'
				error={Boolean(errors.embed?.fields?.[index]?.value)}
				helperText={errors.embed?.fields?.[index]?.value?.message}
				characterLimit={EMBED_LIMITS.field.value}
				{...register(`embed.fields.${index}.value`)}
			/> */}
			<ControlledTextField
				name={`embed.fields.${index}.value`}
				control={control}
				inputProps={{
					characterLimit: EMBED_LIMITS.field.value,
					fullWidth: true,
					multiline: true,
					minRows: 3,
					maxRows: 6,
					label: t('form.labels.fieldValue'),
					margin: 'dense',
				}}
			/>
			<Controller
				name={`embed.fields.${index}.inline`}
				control={control}
				render={({ field }) => (
					<FormControlLabel
						control={<Checkbox checked={field.value} onChange={field.onChange} />}
						label={t('form.labels.fieldInline').toString()}
					/>
				)}
			/>

			<ConfirmDialog
				open={openConfirmation}
				onClose={handleClose}
				onConfirm={handleDelete}
				title={t('confirmFieldDeletion')}
			/>
		</Wrapper>
	);
}

function Footer({ control }: IProps): JSX.Element {
	const { t } = useTranslation('embedsPage');
	return (
		<Wrapper>
			<InputLabel sx={{ fontSize: '1.25rem' }}>{t('form.labels.footer')}</InputLabel>
			<ControlledTextField
				name='embed.footer.text'
				control={control}
				inputProps={{
					characterLimit: EMBED_LIMITS.footer,
					fullWidth: true,
					label: t('form.labels.footerText'),
					margin: 'dense',
				}}
			/>
			<ControlledTextField
				name='embed.footer.iconURL'
				control={control}
				inputProps={{
					fullWidth: true,
					label: t('form.labels.iconURL'),
					margin: 'dense',
				}}
			/>
			<Timestamp control={control} />
		</Wrapper>
	);
}

function Timestamp({ control }: IProps): JSX.Element {
	const { t } = useTranslation('embedsPage');
	return (
		<Controller
			name='embed.timestamp'
			control={control}
			render={({ field, fieldState }) => (
				<DateTimePicker
					mask='__.__.____ __:__'
					label={t('form.labels.timestamp')}
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
