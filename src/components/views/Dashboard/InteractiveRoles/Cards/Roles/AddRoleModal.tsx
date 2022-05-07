import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
	Control,
	SubmitHandler,
	useFormContext,
	UseFormSetValue,
	FieldErrors,
	Controller,
	FieldError,
	useWatch,
	useFieldArray,
} from 'react-hook-form';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormHelperText,
	IconButton,
	styled,
} from '@mui/material';
import { EmojiPicker } from 'react-discord-components';

import ControlledTextField from '@components/Inputs/Controlled/TextField';
import ControlledSelect from '@components/Inputs/Controlled/Select';
import RoleSelect from '@components/Inputs/RoleSelect';

import Emoji from './Emoji';
import type { InteractiveRolesFormValues } from '../../utils/useInteractiveRolesForm';
import useAddRoleForm, { AddRoleFormValues, validActions, validStyles } from '../../utils/useAddRoleForm';

import type { Role, GuildEmojis } from 'types';

interface AddRoleModalProps {
	guildRoles: Role[] | undefined;
	globalEmojis: GuildEmojis | undefined;
	guildEmojis: GuildEmojis | undefined;
}

export default function AddRoleModal({ guildRoles = [], globalEmojis, guildEmojis }: AddRoleModalProps): JSX.Element {
	const { t } = useTranslation('interactiveRolesPage');
	const { watch, control: rootControl } = useFormContext<InteractiveRolesFormValues>();
	const type = watch('type');
	const roles = watch('roles');
	const uniqueValues = roles.map(r => ({ icon: r.icon, label: r.label }));

	const { append } = useFieldArray({ control: rootControl, name: 'roles' });

	const [open, setOpen] = useState(false);

	const defaultValues: AddRoleFormValues = {
		icon: '',
		label: '',
		description: '',
		style: 'PRIMARY',
		roleId: '',
		action: 'toggle',
	};

	const {
		handleSubmit,
		control,
		setValue,
		reset,
		formState: { errors },
	} = useAddRoleForm({ defaultValues, type, roles: guildRoles, unique: uniqueValues });

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAdd: SubmitHandler<AddRoleFormValues> = values => {
		setOpen(false);
		append(values);
		reset();
	};

	return (
		<>
			<Button variant='outlined' size='small' onClick={handleOpen} disabled={roles.length >= 5}>
				{t('form.buttons.addRole')}
			</Button>
			<Dialog open={open}>
				<DialogTitle>{t('form.labels.addRoleModal.title')}</DialogTitle>
				<DialogContent>
					<Form
						control={control}
						setValue={setValue}
						errors={errors}
						roles={guildRoles}
						globalEmojis={globalEmojis}
						guildEmojis={guildEmojis}
					/>
				</DialogContent>
				<DialogActions>
					<Button variant='outlined' size='small' onClick={handleClose}>
						{t('common:cancel')}
					</Button>
					<Button variant='contained' size='small' onClick={handleSubmit(handleAdd)}>
						{t('common:submit')}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

interface FormProps {
	control: Control<AddRoleFormValues>;
	setValue: UseFormSetValue<AddRoleFormValues>;
	errors: FieldErrors<AddRoleFormValues>;
	roles: Role[];
	globalEmojis: GuildEmojis | undefined;
	guildEmojis: GuildEmojis | undefined;
}

export function Form({ control, setValue, errors, roles, globalEmojis, guildEmojis }: FormProps) {
	const { t } = useTranslation('interactiveRolesPage');
	const { watch } = useFormContext<InteractiveRolesFormValues>();
	const type = watch('type');

	return (
		<>
			<ControlledEmojiPicker
				control={control}
				setValue={setValue}
				error={errors.icon}
				globalEmojis={globalEmojis}
				guildEmojis={guildEmojis}
			/>
			{type !== 'reactions' ? (
				<ControlledTextField
					control={control}
					name='label'
					inputProps={{
						characterLimit: 80,
						label: t('creator.roleList.label'),
						size: 'small',
						fullWidth: true,
					}}
				/>
			) : null}
			{type === 'select' ? (
				<ControlledTextField
					control={control}
					name='description'
					inputProps={{
						characterLimit: 100,
						label: t('creator.roleList.description'),
						size: 'small',
						fullWidth: true,
						multiline: true,
					}}
				/>
			) : null}
			{type === 'buttons' ? (
				<ControlledSelect
					control={control}
					name='style'
					inputProps={{
						sx: { marginBottom: '1rem' },
						label: t('creator.roleList.style'),
						size: 'small',
						items: validStyles.map(style => ({ value: style, label: t(`buttonStyles.${style}`) })),
					}}
				/>
			) : null}
			<Controller
				control={control}
				name='roleId'
				render={({ field, fieldState }) => (
					<RoleSelect
						roles={roles}
						size='small'
						{...field}
						error={fieldState.invalid}
						helperText={fieldState.error?.message}
					/>
				)}
			/>
			{type !== 'select' ? (
				<ControlledSelect
					control={control}
					name='action'
					inputProps={{
						sx: { marginTop: '1rem' },
						label: t('creator.roleList.action'),
						items: validActions.map(action => ({ value: action, label: t(`actions.${action}`) })),
						size: 'small',
					}}
				/>
			) : null}
		</>
	);
}

interface ControlledEmojiPickerProps {
	control: Control<AddRoleFormValues>;
	setValue: UseFormSetValue<AddRoleFormValues>;
	error: FieldError | undefined;
	globalEmojis: GuildEmojis | undefined;
	guildEmojis: GuildEmojis | undefined;
}

const StyledEmojiPicker = styled(EmojiPicker)({
	boxSizing: 'content-box', // TODO  WORKAROUND, need change in library
});
function ControlledEmojiPicker({ control, setValue, error, globalEmojis, guildEmojis }: ControlledEmojiPickerProps) {
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const { icon } = useWatch({ control });

	const handleToggle = () => {
		setOpen(!open);
	};

	return (
		<div style={{ marginBottom: '1rem' }}>
			<IconButton ref={setAnchorEl} onClick={handleToggle}>
				<Emoji emoji={icon} />
			</IconButton>
			{error ? <FormHelperText error>{error.message}</FormHelperText> : null}
			<StyledEmojiPicker
				anchorEl={anchorEl}
				open={open}
				placement='auto-end'
				onEmojiClick={emoji =>
					setValue('icon', 'id' in emoji ? `${emoji.animated ? '<a:' : '<:'}${emoji.name}:${emoji.id}>` : emoji.char)
				}
				customEmojis={[...(globalEmojis ? [globalEmojis] : []), ...(guildEmojis ? [guildEmojis] : [])]}
			/>
		</div>
	);
}
