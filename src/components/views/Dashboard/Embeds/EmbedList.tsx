import { Fragment, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

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

import type { EmbedMessage, GuildChannels } from 'types';
import { useTranslation } from 'next-i18next';
import useIsDesktop from '@hooks/useIsDesktop';

interface IProps {
	channels: GuildChannels;
	embeds: EmbedMessage[];
}

export default function EmbedList({ channels, embeds }: IProps): JSX.Element {
	const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState<string | null>(null);
	const { t } = useTranslation();
	const router = useRouter();
	const guildId = router.query.guildId as string;
	const isDesktop = useIsDesktop();

	const handleCreateEmbed = () => {
		router.push(`${router.asPath}/creator`, undefined, { shallow: true });
	};

	const handleEditEmbed = (embedId: string) => {
		router.push(`${router.asPath}/${embedId}`, undefined, { shallow: true });
	};

	const handleDelete = async () => {
		const { data } = await axios.delete(`${process.env.API_URL}/guilds/${guildId}/embeds`, {
			data: {
				embedId: openDeleteConfirmation,
			},
			withCredentials: true,
		});
		if (data) router.replace(router.asPath);
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
				header={t('dashboardPage:embeds.listHeader')}
				initialExpand
				action={
					<Button variant='contained' sx={{ marginRight: '1rem' }} onClick={handleCreateEmbed}>
						<Icon icon={faAdd} sx={{ marginRight: '1rem', fontSize: '1.25rem' }} />
						{t('dashboardPage:embeds.form.buttons.createEmbed')}
					</Button>
				}
			>
				<List>
					{embeds.length ? (
						embeds.map(embed => {
							const channel = channels.text.find(channel => channel.id === embed.channelId);
							return (
								<Fragment key={embed._id}>
									<ListItem>
										<ListItemText
											primary={embed.name}
											secondary={channel && embed.messageId ? `#${channel?.name}` : t('dashboardPage:embeds.notSent')}
										/>
										<ListItemSecondaryAction>
											{isDesktop ? (
												<Button variant='outlined' onClick={() => (embed._id ? handleEditEmbed(embed._id) : undefined)}>
													<Icon icon={faEdit} sx={{ marginRight: '1rem', fontSize: '1.25rem' }} />
													{t('dashboardPage:embeds.form.buttons.edit')}
												</Button>
											) : (
												<Tooltip title={t('dashboardPage:embeds.form.buttons.edit').toString()}>
													<IconButton
														size={isDesktop ? 'large' : 'small'}
														onClick={() => (embed._id ? handleEditEmbed(embed._id) : undefined)}
													>
														<Icon icon={faEdit} />
													</IconButton>
												</Tooltip>
											)}
											<Tooltip title={t('dashboardPage:embeds.form.buttons.delete').toString()}>
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
							{t('dashboardPage:embeds.noEmbeds')}
						</Typography>
					)}
				</List>
			</DashboardCard>
			<ConfirmDialog
				title={t('dashboardPage:embeds.confirmEmbedDeletion')}
				open={Boolean(openDeleteConfirmation)}
				onClose={handleCloseConfirmation}
				onConfirm={handleDelete}
			/>
		</View>
	);
}
