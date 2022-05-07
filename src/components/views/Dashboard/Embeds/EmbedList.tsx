import { Fragment, useState } from 'react';
import { useSWRConfig } from 'swr';
import axios from 'axios';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

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

import DashboardCard from '@components/DashboardCard';
import Icon from '@components/Icon';
import View from '@components/View';
import ConfirmDialog from '@components/Dialogs/ConfirmDialog';

import useIsDesktop from '@hooks/useIsDesktop';
import useGuildId from '@hooks/useGuildId';

import type { EmbedMessage, GuildChannels } from 'types';

interface IProps {
	channels: GuildChannels | undefined;
	embeds: EmbedMessage[] | undefined;
}

export default function EmbedList({ channels, embeds }: IProps): JSX.Element {
	const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState<string | null>(null);
	const { t } = useTranslation('embedsPage');
	const { mutate } = useSWRConfig();
	const router = useRouter();
	const guildId = useGuildId();
	const isDesktop = useIsDesktop();

	const handleCreateEmbed = () => {
		router.push(`${router.asPath}/creator`, undefined, { shallow: true });
	};

	const handleEditEmbed = (embedId: string) => {
		router.push(`${router.asPath}/${embedId}`, undefined, { shallow: true });
	};

	const handleDelete = async () => {
		const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/embeds`, {
			data: {
				embedId: openDeleteConfirmation,
			},
			withCredentials: true,
		});
		if (data) mutate(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/embeds`);
	};

	const handleCloseConfirmation = () => {
		setOpenDeleteConfirmation(null);
	};

	const handleOpenConfirmation = (embedId: string) => {
		setOpenDeleteConfirmation(embedId);
	};

	return (
		<View>
			<DashboardCard
				header={t('listHeader')}
				initialExpand
				action={
					isDesktop ? (
						<Button variant='contained' sx={{ marginRight: '1rem' }} onClick={handleCreateEmbed}>
							<Icon icon={faAdd} sx={{ marginRight: '1rem', fontSize: '1.25rem' }} />
							{t('form.buttons.createEmbed')}
						</Button>
					) : (
						<Tooltip title={t('form.buttons.createEmbed').toString()}>
							<IconButton onClick={handleCreateEmbed} sx={{ backgroundColor: theme => theme.colors.primary.main }}>
								<Icon icon={faAdd} />
							</IconButton>
						</Tooltip>
					)
				}
			>
				{embeds ? (
					<List>
						{embeds.length ? (
							embeds.map(embed => {
								const channel = channels?.text?.find(channel => channel.id === embed.channelId);
								return (
									<Fragment key={embed._id}>
										<ListItem>
											<ListItemText
												primary={embed.name}
												secondary={channel && embed.messageId ? `#${channel?.name}` : t('notSent')}
											/>
											<ListItemSecondaryAction>
												{isDesktop ? (
													<Button
														variant='outlined'
														onClick={() => (embed._id ? handleEditEmbed(embed._id) : undefined)}
													>
														<Icon icon={faEdit} sx={{ marginRight: '1rem', fontSize: '1.25rem' }} />
														{t('form.buttons.edit')}
													</Button>
												) : (
													<Tooltip title={t('form.buttons.edit').toString()}>
														<IconButton
															size={isDesktop ? 'large' : 'small'}
															onClick={() => (embed._id ? handleEditEmbed(embed._id) : undefined)}
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
														onClick={() => (embed._id ? handleOpenConfirmation(embed._id) : undefined)}
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
								{t('noEmbeds')}
							</Typography>
						)}
					</List>
				) : (
					<Loading />
				)}
			</DashboardCard>
			<ConfirmDialog
				title={t('confirmEmbedDeletion')}
				open={Boolean(openDeleteConfirmation)}
				onClose={handleCloseConfirmation}
				onConfirm={handleDelete}
			/>
		</View>
	);
}

function Loading() {
	return <>Loading</>;
}
