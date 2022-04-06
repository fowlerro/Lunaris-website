import { useReducer, useState } from 'react';
import { useRouter } from 'next/router';

import DataSaveToaster from '@components/DataSaveToaster';

import AddAutoRole from './AddAutoRole';
import AutoRoleList from './AutoRoleList';

import type { AutoRole, AutoRolePageData, Role } from 'types';
import axios from 'axios';

interface IProps {
	autoRolesData: AutoRolePageData;
	roles: Role[];
}

enum Actions {
	Add = 'ADD',
	Delete = 'DELETE',
	Toggle = 'TOGGLE',
}

interface ReducerAction {
	type: Actions;
	payload: AutoRole;
}

function autoRolesReducer(state: AutoRolePageData, action: ReducerAction): AutoRolePageData {
	const { type, payload } = action;

	switch (type) {
		case Actions.Add:
			if (state.autoRoles.find(autoRole => autoRole.roleId === payload.roleId)) return state;
			return {
				...state,
				autoRoles: [...state.autoRoles, payload],
			};

		case Actions.Delete:
			return {
				...state,
				autoRoles: state.autoRoles.filter(role => role.roleId !== payload.roleId),
			};

		case Actions.Toggle:
			return {
				...state,
				status: !state.status,
			};
		default:
			return state;
	}
}

export default function AutoRoles({ autoRolesData, roles }: IProps): JSX.Element {
	const router = useRouter();
	const guildId = router.query.guildId;
	const [savedData, setSavedData] = useState(autoRolesData);
	const [autoRoles, dispatch] = useReducer(autoRolesReducer, autoRolesData);
	const isDataChanged =
		savedData.status !== autoRoles.status ||
		savedData.autoRoles.length !== autoRoles.autoRoles.length ||
		savedData.autoRoles.some(role => autoRoles.autoRoles.find(r => r.roleId === role.roleId)?.time !== role.time);

	const handleAddAutoRole = (roleId: string, duration: number) => {
		dispatch({
			type: Actions.Add,
			payload: {
				roleId,
				time: duration,
			},
		});
	};

	const handleDeleteAutoRole = (roleId: string) => {
		dispatch({
			type: Actions.Delete,
			payload: {
				roleId,
				time: 0,
			},
		});
	};

	const handleToggleAutoRoles = () => {
		dispatch({
			type: Actions.Toggle,
			payload: { roleId: '', time: 0 },
		});
	};

	const handleSaveData = async () => {
		if (typeof autoRoles.status !== 'boolean') return;
		if (!Array.isArray(autoRoles.autoRoles)) return;
		if (autoRoles.autoRoles.length > 5) return;
		const tempDuplicates = new Set();
		const hasDuplicates = autoRoles.autoRoles.some(
			autoRole => tempDuplicates.size === tempDuplicates.add(autoRole.roleId).size
		);
		if (hasDuplicates) return;
		const data = await axios.put(`${process.env.API_URL}/guilds/${guildId}/auto-roles`, autoRoles, {
			withCredentials: true,
		});
		if (data.status === 200) {
			setSavedData(autoRoles);
		}
	};

	return (
		<>
			<AddAutoRole roles={roles} autoRoles={autoRoles.autoRoles} onSubmit={handleAddAutoRole} />
			<AutoRoleList
				roles={roles}
				status={autoRoles.status}
				autoRoles={autoRoles.autoRoles}
				onDelete={handleDeleteAutoRole}
				onToggle={handleToggleAutoRoles}
			/>
			<DataSaveToaster
				isDataChanged={isDataChanged}
				onSave={handleSaveData}
				onReset={() => {
					console.log('TODO');
				}}
			/>
		</>
	);
}
