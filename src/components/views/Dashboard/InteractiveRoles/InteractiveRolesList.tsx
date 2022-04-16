import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import useSWR, { useSWRConfig } from 'swr';
import axios from 'axios';

import {
	Button,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Tooltip,
	Typography,
} from '@mui/material';

import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';
import View from '@components/View';
import DashboardCard from '@components/DashboardCard';
import ConfirmDialog from '@components/Dialogs/ConfirmDialog';

import { fetcher } from '@utils/utils';
import useIsDesktop from '@hooks/useIsDesktop';

import type { GuildChannels, InteractiveRolesType } from 'types';

export default function InteractiveRolesList(): JSX.Element {
	const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState<string | null>(null);
	const { t } = useTranslation('interactiveRolesPage');
	const { mutate } = useSWRConfig();
	const router = useRouter();
	const guildId = router.query.guildId as string;
	const isDesktop = useIsDesktop();

	const { data: interactiveRoles } = useSWR<InteractiveRolesType[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/interactive-roles`,
		fetcher,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnMount: false,
			revalidateOnReconnect: false,
		}
	);
	const { data: channels } = useSWR<GuildChannels>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/channels`,
		fetcher,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnMount: false,
			revalidateOnReconnect: false,
		}
	);

	const handleCreate = () => {
		router.push(`${router.asPath}/creator`, undefined, { shallow: true });
	};

	const handleEdit = (interactiveRoleId: string) => {
		router.push(`${router.asPath}/${interactiveRoleId}`, undefined, { shallow: true });
	};

	const handleDelete = async () => {
		const { data } = await axios.delete(
			`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/interactive-roles/${openDeleteConfirmation}`,
			{
				withCredentials: true,
			}
		);
		if (data) mutate(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/interactive-roles`);
	};

	const handleCloseConfirmation = () => {
		setOpenDeleteConfirmation(null);
	};

	const handleOpenConfirmation = (interactiveRoleId: string) => {
		setOpenDeleteConfirmation(interactiveRoleId);
	};

	return (
		<View>
			<DashboardCard
				header={t('list.header')}
				initialExpand
				action={
					isDesktop ? (
						<Button variant='contained' sx={{ marginRight: '1rem' }} onClick={handleCreate}>
							<Icon icon={faAdd} sx={{ marginRight: '1rem', fontSize: '1.25rem' }} />
							{t('form.buttons.createInteractiveRole')}
						</Button>
					) : (
						<Tooltip title={t('form.buttons.createInteractiveRole').toString()}>
							<IconButton onClick={handleCreate} sx={{ backgroundColor: theme => theme.colors.primary.main }}>
								<Icon icon={faAdd} />
							</IconButton>
						</Tooltip>
					)
				}
			>
				{interactiveRoles ? (
					<List>
						{interactiveRoles.length ? (
							interactiveRoles.map(interactiveRole => {
								const channel = channels?.text?.find(channel => channel.id === interactiveRole.channelId);
								return (
									<Fragment key={interactiveRole._id}>
										<ListItem>
											<ListItemText
												primary={interactiveRole.name}
												secondary={channel && interactiveRole.messageId ? `#${channel.name}` : t('notSent')}
											/>
											<ListItemSecondaryAction>
												{isDesktop ? (
													<Button
														variant='outlined'
														onClick={() => (interactiveRole._id ? handleEdit(interactiveRole._id) : undefined)}
													>
														<Icon icon={faEdit} sx={{ marginRight: '1rem', fontSize: '1.25rem' }} />
														{t('form.buttons.edit')}
													</Button>
												) : (
													<Tooltip title={t('form.buttons.edit').toString()}>
														<IconButton
															size={isDesktop ? 'large' : 'small'}
															onClick={() => (interactiveRole._id ? handleEdit(interactiveRole._id) : undefined)}
														>
															<Icon icon={faEdit} />
														</IconButton>
													</Tooltip>
												)}
												<Tooltip title={t('form.buttons.delete').toString()}>
													<IconButton
														sx={{ marginLeft: '1rem' }}
														color='error'
														size={isDesktop ? 'large' : 'small'}
														onClick={() =>
															interactiveRole._id ? handleOpenConfirmation(interactiveRole._id) : undefined
														}
													>
														<Icon icon={faTrash} />
													</IconButton>
												</Tooltip>
											</ListItemSecondaryAction>
										</ListItem>
										<Divider variant='middle' />
									</Fragment>
								);
							})
						) : (
							<Typography variant='subtitle1' sx={{ width: '100%', textAlign: 'center', marginTop: '3rem' }}>
								{t('list.noEntries')}
							</Typography>
						)}
					</List>
				) : (
					<></>
				)}
			</DashboardCard>
			<ConfirmDialog
				title={t('confirmDeletion')}
				open={Boolean(openDeleteConfirmation)}
				onClose={handleCloseConfirmation}
				onConfirm={handleDelete}
			/>
		</View>
	);
}
