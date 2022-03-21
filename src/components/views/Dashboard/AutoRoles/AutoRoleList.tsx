import { useTranslation } from 'next-i18next';
import moment from 'moment';

import { Badge, Box, Divider, IconButton, Stack, styled, Switch, Tooltip, Typography } from '@mui/material';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';
import DashboardCard from '@components/DashboardCard';

import useIsDesktop from '@hooks/useIsDesktop';

import type { AutoRole, Role } from 'types';

interface IProps {
	roles: Role[];
	status: boolean;
	autoRoles: AutoRole[];
	onDelete: (roleId: string) => void;
	onToggle: () => void;
}

interface RowProps {
	roleId: string;
	role: string;
	roleColor: string;
	duration: string;
	onDelete: (roleId: string) => void;
}

const RowContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	paddingBlock: '1rem',
	borderRadius: '8px',
	alignItems: 'center',
	gap: '.5rem',

	'&:hover': {
		backgroundColor: theme.colors.background.input,
	},

	[theme.breakpoints.up('md')]: {
		padding: '1rem',
	},
}));

export default function AutoRoleList({ roles, status, autoRoles, onDelete, onToggle }: IProps): JSX.Element {
	const isDesktop = useIsDesktop();
	const { t } = useTranslation();

	return (
		<DashboardCard
			header={t('dashboardPage:autoRoles.autoRoleListHeader')}
			initialExpand
			action={
				<Tooltip title={t('common:toggleModule').toString()}>
					<Badge badgeContent='?' overlap='circular' sx={{ color: theme => theme.colors.primary.main }}>
						<Switch checked={status} onChange={onToggle} />
					</Badge>
				</Tooltip>
			}
		>
			<Stack mx={{ sm: '.5rem', md: '1rem' }}>
				<Box px={{ sm: '.5rem', md: '1rem' }} sx={{ display: 'flex' }}>
					<Typography variant={isDesktop ? 'subtitle1' : 'subtitle2'} sx={{ fontWeight: 400, flex: 1 }}>
						{t('common:role')}
					</Typography>
					<Typography variant={isDesktop ? 'subtitle1' : 'subtitle2'} sx={{ fontWeight: 400, flex: 1 }}>
						{t('common:duration')}
					</Typography>
					<Typography variant={isDesktop ? 'subtitle1' : 'subtitle2'} sx={{ fontWeight: 400, flex: 0 }}>
						{t('common:delete')}
					</Typography>
				</Box>
				{autoRoles.map(autoRole => {
					const role = roles.find(role => role.id === autoRole.roleId);
					const roleColor = `#${role?.color ? role.color.toString(16) : '99AAB5'}`;
					const duration = autoRole.time
						? moment.duration(autoRole.time).format({ template: 'd __ h __ m __ s __', trim: 'both' })
						: '-';
					return (
						<Row
							key={autoRole.roleId}
							roleId={autoRole.roleId}
							role={role?.name || ''}
							roleColor={roleColor}
							duration={duration}
							onDelete={onDelete}
						/>
					);
				})}
			</Stack>
		</DashboardCard>
	);
}

function Row({ roleId, role, roleColor, duration, onDelete }: RowProps) {
	const isDesktop = useIsDesktop();

	return (
		<>
			<RowContainer>
				<Typography variant={isDesktop ? 'subtitle1' : 'subtitle2'} sx={{ fontWeight: 400, color: roleColor, flex: 1 }}>
					{role}
				</Typography>
				<Typography variant={isDesktop ? 'subtitle1' : 'subtitle2'} sx={{ fontWeight: 400, flex: 1 }}>
					{duration}
				</Typography>
				<IconButton sx={{ flex: 0 }} color='error' onClick={() => onDelete(roleId)} size='small'>
					<Icon icon={faTrash} size='1x' />
				</IconButton>
			</RowContainer>
			<Divider />
		</>
	);
}
