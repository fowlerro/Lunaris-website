import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form';

import {
	FormHelperText,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';

import Emoji from './Emoji';
import EditRoleModal from './EditRoleModal';
import { AddRoleFormValues } from '../../utils/useAddRoleForm';

import { getRoleColor } from '@utils/utils';

import type { InteractiveRolesFormValues } from '../../utils/useInteractiveRolesForm';
import type { GuildEmojis, Role } from 'types';

interface RoleListProps {
	guildRoles: Role[] | undefined;
	globalEmojis: GuildEmojis | undefined;
	guildEmojis: GuildEmojis | undefined;
}

export default function RoleList({ guildRoles = [], globalEmojis, guildEmojis }: RoleListProps): JSX.Element {
	const { t } = useTranslation('interactiveRolesPage');

	const [openEdit, setOpenEdit] = useState(-1);

	const {
		watch,
		control,
		formState: { errors },
	} = useFormContext<InteractiveRolesFormValues>();
	const type = watch('type');
	const roles = watch('roles');

	const { remove, update } = useFieldArray({ control, name: 'roles' });

	const handleEdit: SubmitHandler<AddRoleFormValues> = values => {
		update(openEdit, values);
		setOpenEdit(-1);
	};

	const handleEditClose = () => {
		setOpenEdit(-1);
	};

	return (
		<>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{type !== 'reactions' ? <TableCell>{t('creator.roleList.icon')}</TableCell> : null}
							<TableCell>{t(`creator.roleList.${type === 'reactions' ? 'emoji' : 'label'}`)}</TableCell>
							{type === 'select' ? <TableCell>{t('creator.roleList.description')}</TableCell> : null}
							{type === 'buttons' ? <TableCell>{t('creator.roleList.style')}</TableCell> : null}
							<TableCell>{t('creator.roleList.role')}</TableCell>
							{type !== 'select' ? <TableCell>{t('creator.roleList.action')}</TableCell> : null}
							<TableCell align='right' />
						</TableRow>
					</TableHead>
					<TableBody>
						{roles.map((role, index) => {
							const guildRole = guildRoles.find(r => r.id === role.roleId);
							return (
								<TableRow key={role.roleId}>
									<TableCell>
										<Emoji emoji={role.icon} />
									</TableCell>
									{type !== 'reactions' ? <TableCell>{role.label}</TableCell> : null}
									{type === 'select' ? <TableCell>{role.description}</TableCell> : null}
									{type === 'buttons' ? <TableCell>{t(`buttonStyles.${role.style}`)}</TableCell> : null}
									<TableCell sx={{ color: getRoleColor(guildRole?.color ?? 0) }}>
										{guildRole?.name ?? t('common:unknown')}
									</TableCell>
									{type !== 'select' ? <TableCell>{t(`actions.${role.action}`)}</TableCell> : null}
									<TableCell align='right'>
										<IconButton aria-label='edit' onClick={() => setOpenEdit(index)}>
											<Icon icon={faEdit} sx={{ fontSize: '1.25rem' }} />
										</IconButton>
										<IconButton color='error' aria-label='delete' onClick={() => remove(index)}>
											<Icon icon={faTrash} sx={{ fontSize: '1.25rem' }} />
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			{/* Typescript doesn't know about Yup error structure since `errors.roles` is an array of errors for role's properties and is complaining! */}
			{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
			{/* @ts-ignore */}
			{errors.roles?.message ? <FormHelperText error>{errors.roles.message}</FormHelperText> : null}
			{openEdit !== -1 ? (
				<EditRoleModal
					guildRoles={guildRoles}
					open={openEdit !== -1}
					index={openEdit}
					onSubmit={handleEdit}
					onClose={handleEditClose}
					globalEmojis={globalEmojis}
					guildEmojis={guildEmojis}
				/>
			) : null}
		</>
	);
}
