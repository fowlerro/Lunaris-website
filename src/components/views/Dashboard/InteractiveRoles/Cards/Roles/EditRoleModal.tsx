import useTranslation from 'next-translate/useTranslation';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { Form } from './AddRoleModal';
import useAddRoleForm, { AddRoleFormValues } from '../../utils/useAddRoleForm';
import { InteractiveRolesFormValues } from '../../utils/useInteractiveRolesForm';

import type { GuildEmojis, Role } from 'types';

interface EditRoleModalProps {
	open: boolean;
	index: number;
	guildRoles: Role[] | undefined;
	onSubmit: SubmitHandler<AddRoleFormValues>;
	onClose: () => void;
	globalEmojis: GuildEmojis | undefined;
	guildEmojis: GuildEmojis | undefined;
}

export default function EditRoleModal({
	open,
	index,
	guildRoles = [],
	onSubmit,
	onClose,
	globalEmojis,
	guildEmojis,
}: EditRoleModalProps): JSX.Element {
	const { t } = useTranslation('interactiveRolesPage');

	const { watch } = useFormContext<InteractiveRolesFormValues>();
	const type = watch('type');
	const roles = watch('roles');
	const unique = roles.filter((r, i) => i !== index).map(r => ({ icon: r.icon, label: r.label }));

	const defaultValues: AddRoleFormValues = {
		icon: roles[index].icon,
		label: roles[index].label,
		description: roles[index].description,
		style: roles[index].style,
		roleId: roles[index].roleId,
		action: roles[index].action,
	};

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useAddRoleForm({
		defaultValues,
		roles: guildRoles,
		type,
		unique,
	});

	return (
		<Dialog open={open}>
			<DialogTitle>{t('form.labels.editRoleModal.title')}</DialogTitle>
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
				<Button variant='outlined' size='small' onClick={onClose}>
					{t('common:cancel')}
				</Button>
				<Button variant='contained' size='small' onClick={handleSubmit(onSubmit)}>
					{t('common:submit')}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
