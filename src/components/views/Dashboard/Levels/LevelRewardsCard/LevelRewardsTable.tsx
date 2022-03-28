import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { useFieldArray, Control } from 'react-hook-form';

import {
	Button,
	Checkbox,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';
import AddLevelRewardModal from './AddLevelRewardModal';
import { getRoleColor } from '@utils/utils';

import type { LevelConfigPageData, LevelReward, Role } from 'types';

interface IProps {
	control: Control<LevelConfigPageData>;
	roles: Role[];
	voice?: boolean;
}

export default function LevelRewardsTable({ control, roles, voice = false }: IProps): JSX.Element {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();

	const { fields, append, remove } = useFieldArray({
		control,
		name: `levelConfig.rewards.${voice ? 'voice' : 'text'}`,
	});

	const handleAddReward = (reward: LevelReward): void => {
		append(reward);
	};

	return (
		<div>
			<Button variant='contained' size='small' onClick={() => setOpen(true)}>
				{t('dashboardPage:levels.addReward')}
			</Button>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align='right'>{t('common:level')}</TableCell>
							<TableCell>{t('common:role')}</TableCell>
							<TableCell align='right'>{t('dashboardPage:levels.removePreviousReward')}</TableCell>
							<TableCell align='right'>{t('common:delete')}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{fields
							.sort((a, b) => a.level - b.level)
							.map((levelReward, index) => {
								const role = roles.find(role => role.id === levelReward.roleId);

								return (
									<TableRow key={levelReward.id}>
										<TableCell align='right'>{levelReward.level}</TableCell>
										<TableCell sx={{ color: getRoleColor(role?.color || 0) }}>{role?.name}</TableCell>
										<TableCell align='right'>
											<Checkbox checked={levelReward.takePreviousRole} />
										</TableCell>
										<TableCell align='right'>
											<IconButton onClick={() => remove(index)} color='error'>
												<Icon icon={faTrash} />
											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<AddLevelRewardModal open={open} setOpen={setOpen} roles={roles} addRole={handleAddReward} />
		</div>
	);
}
