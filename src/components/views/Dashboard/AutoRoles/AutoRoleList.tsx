import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Control, useFieldArray, useWatch } from 'react-hook-form';

import { formatDuration, intervalToDuration } from 'date-fns';
import { pl } from 'date-fns/locale';

import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';
import DashboardCard from '@components/DashboardCard';
import Explanation from '@components/Explanation';
import ControlledSwitch from '@components/Inputs/Controlled/ControlledSwitch';

import { getRoleColor } from '@utils/utils';

import type { AutoRolePageData, Role } from 'types';

interface IProps {
	roles: Role[];
	control: Control<AutoRolePageData>;
}

export default function AutoRoleList({ roles, control }: IProps): JSX.Element {
	const { locale } = useRouter();
	const { t } = useTranslation();

	const { remove } = useFieldArray({
		control,
		name: 'autoRoles',
	});

	const { autoRoles } = useWatch({
		control,
	});

	return (
		<DashboardCard
			header={t('autoRolesPage:listHeader')}
			initialExpand
			action={
				<Explanation label={t('common:toggleModule')}>
					<ControlledSwitch control={control} name='status' />
				</Explanation>
			}
		>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>{t('common:role')}</TableCell>
							<TableCell align='right'>{t('common:duration')}</TableCell>
							<TableCell align='right'>{t('common:delete')}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{autoRoles?.map((autoRole, index) => {
							const role = roles.find(role => role.id === autoRole.roleId);
							const duration = autoRole.time
								? formatDuration(intervalToDuration({ start: 0, end: autoRole.time }), {
										locale: locale === 'pl' ? pl : undefined,
										delimiter: ', ',
								  })
								: '-';

							return (
								<TableRow key={autoRole.roleId}>
									<TableCell sx={{ color: getRoleColor(role?.color || 0) }}>{role?.name}</TableCell>
									<TableCell align='right'>{duration}</TableCell>
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
		</DashboardCard>
	);
}
