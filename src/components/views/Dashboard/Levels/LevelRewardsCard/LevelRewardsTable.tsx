import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { useFieldArray, Control, useFormState, FieldError } from 'react-hook-form';

import {
	Button,
	Checkbox,
	FormHelperText,
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
import Skeleton from '@components/Loading/Skeleton';

import { getRoleColor } from '@utils/utils';

import AddLevelRewardModal from './AddLevelRewardModal';

import type { LevelConfigPageData, LevelReward, Role } from 'types';

interface IProps {
	control: Control<LevelConfigPageData>;
	roles: Role[] | undefined;
	voice?: boolean;
}

export default function LevelRewardsTable({ control, roles, voice = false }: IProps): JSX.Element {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();

	const { fields, append, remove } = useFieldArray({
		control,
		name: `levelConfig.rewards.${voice ? 'voice' : 'text'}`,
	});
	const { errors } = useFormState({ control });

	const rewardsError = errors.levelConfig?.rewards?.[voice ? 'voice' : 'text'] as unknown as FieldError | undefined;

	const indexes = new Map(fields.map(({ id }, index) => [id, index]));

	const handleAddReward = (reward: LevelReward): void => {
		if (fields.length >= 20) return;
		append(reward);
	};

	return (
		<div>
			<Button variant='contained' size='small' onClick={() => setOpen(true)} disabled={fields.length >= 20}>
				{t('levelsPage:addReward')}
			</Button>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align='right'>{t('common:level')}</TableCell>
							<TableCell>{t('common:role')}</TableCell>
							<TableCell align='right'>{t('levelsPage:takePreviousReward')}</TableCell>
							<TableCell align='right'>{t('common:delete')}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.from(fields)
							.sort((a, b) => a.level - b.level)
							.map(levelReward => {
								const role = roles?.find(role => role.id === levelReward.roleId);

								return (
									<TableRow key={levelReward.id}>
										<TableCell align='right'>{levelReward.level}</TableCell>
										<TableCell sx={{ color: getRoleColor(role?.color || 0) }}>
											{role?.name ? role.name : <Skeleton variant='text' width='5ch' />}
										</TableCell>
										<TableCell align='right'>
											<Checkbox checked={levelReward.takePreviousRole} />
										</TableCell>
										<TableCell align='right'>
											<IconButton onClick={() => remove(indexes.get(levelReward.id))} color='error'>
												<Icon icon={faTrash} />
											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			{fields.length > 20 && rewardsError?.message ? (
				<FormHelperText error>{rewardsError.message}</FormHelperText>
			) : null}
			<AddLevelRewardModal open={open} setOpen={setOpen} roles={roles} addRole={handleAddReward} />
		</div>
	);
}
