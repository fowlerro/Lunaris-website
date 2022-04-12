import { useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import axios from 'axios';

import { Control, Controller, SubmitHandler, UseFormHandleSubmit, UseFormRegister, useWatch } from 'react-hook-form';

import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { faFloppyDisk, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import ConfirmDialog from '@components/Dialogs/ConfirmDialog';
import ChannelSelect from '@components/Inputs/ChannelSelect';
import Icon from '@components/Icon';
import TextField from '@components/Inputs/TextField';

import type { EmbedMessage, GuildChannels } from 'types';

interface IProps {
	register: UseFormRegister<EmbedMessage>;
	control: Control<EmbedMessage>;
	handleSubmit: UseFormHandleSubmit<EmbedMessage>;
	channels: GuildChannels;
	edit?: boolean;
}

export default function EmbedSubmit({ register, handleSubmit, control, channels, edit = false }: IProps): JSX.Element {
	const { t } = useTranslation('embedsPage');
	const router = useRouter();
	const [saving, setSaving] = useState(false);
	const [openConfirmation, setOpenConfirmation] = useState(false);
	const guildId = router.query.guildId as string;
	const {
		channelId,
		_id: embedId,
		messageId,
	} = useWatch({
		control,
	});

	const sendEmbed: SubmitHandler<EmbedMessage> = async embedMessage => {
		if (saving) return;
		setSaving(true);
		const { data } = await axios.put(
			`${process.env.API_URL}/guilds/${guildId}/embeds`,
			{ embedMessage },
			{
				withCredentials: true,
			}
		);
		if (!data) {
			setSaving(false);
			return;
		}
		if (!edit) router.push(`/dashboard/${guildId}/embeds`);
		if (edit) router.replace(router.asPath);
		setSaving(false);
	};

	const saveEmbed: SubmitHandler<EmbedMessage> = async embedMessage => {
		if (saving) return;
		setSaving(true);
		const { data } = await axios.put(
			`${process.env.API_URL}/guilds/${guildId}/embeds`,
			{ embedMessage, withoutSending: true },
			{
				withCredentials: true,
			}
		);
		if (!data) {
			setSaving(false);
			return;
		}
		if (!edit) router.push(`/dashboard/${guildId}/embeds`);
		if (edit) router.replace(router.asPath);
		setSaving(false);
	};

	const deleteEmbed = async () => {
		const { data } = await axios.delete(`${process.env.API_URL}/guilds/${guildId}/embeds`, {
			data: {
				embedId,
			},
			withCredentials: true,
		});
		if (data) router.push(`/dashboard/${guildId}/embeds`);
	};

	return (
		<>
			<TextField
				fullWidth
				label={t('form.labels.embedName')}
				characterLimit={32}
				{...register('name')}
				sx={{ marginTop: '1rem' }}
			/>
			<Controller
				name={'channelId'}
				control={control}
				render={({ field, fieldState }) => (
					<ChannelSelect
						channels={channels}
						value={field.value}
						onChange={field.onChange}
						error={fieldState.invalid}
						helperText={fieldState.error?.message}
					/>
				)}
			/>
			<Box
				display='flex'
				gap='1rem'
				alignItems='center'
				justifyContent='flex-end'
				sx={{ flexDirection: ['column-reverse', 'row'] }}
			>
				{edit && (
					<LoadingButton
						variant='contained'
						color='error'
						loading={saving}
						sx={{ marginRight: 'auto' }}
						onClick={() => setOpenConfirmation(true)}
					>
						{t('form.buttons.delete')}
					</LoadingButton>
				)}
				<LoadingButton
					variant='outlined'
					loading={saving}
					onClick={handleSubmit(saveEmbed)}
					endIcon={<Icon icon={faFloppyDisk} />}
				>
					{t('form.buttons.save')}
				</LoadingButton>
				<LoadingButton
					variant='contained'
					loading={saving}
					disabled={!channelId}
					onClick={handleSubmit(sendEmbed)}
					endIcon={<Icon icon={faPaperPlane} />}
				>
					{t(`form.buttons.${edit && messageId ? 'edit' : 'send'}`)}
				</LoadingButton>
				{edit && (
					<ConfirmDialog
						title={t('confirmEmbedDeletion')}
						open={openConfirmation}
						onClose={() => setOpenConfirmation(false)}
						onConfirm={deleteEmbed}
					/>
				)}
			</Box>
		</>
	);
}
