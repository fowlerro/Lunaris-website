import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import axios from 'axios';

import { Control, Controller, SubmitHandler, UseFormHandleSubmit, UseFormRegister, useWatch } from 'react-hook-form';

import { Autocomplete, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { faFloppyDisk, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';
import TextField from '@components/TextField';

import type { EmbedMessage, GuildChannels } from 'types';
import ConfirmDialog from '@components/Dialogs/ConfirmDialog';

interface IProps {
	register: UseFormRegister<EmbedMessage>;
	control: Control<EmbedMessage>;
	handleSubmit: UseFormHandleSubmit<EmbedMessage>;
	channels: GuildChannels;
	edit?: boolean;
}

export default function EmbedSubmit({ register, handleSubmit, control, channels, edit = false }: IProps): JSX.Element {
	const { t } = useTranslation();
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
				label={t('dashboardPage:embeds.form.labels.embedName')}
				characterLimit={32}
				{...register('name')}
				sx={{ marginTop: '1rem' }}
			/>
			<Controller
				name={'channelId'}
				control={control}
				render={({ field }) => (
					<Autocomplete
						disablePortal
						options={channels.text.map(channel => ({ label: channel.name, id: channel.id }))}
						// eslint-disable-next-line react/prop-types
						defaultValue={
							field.value
								? { label: channels.text.find(channel => channel.id === field.value)?.name, id: field.value }
								: undefined
						}
						isOptionEqualToValue={(option, value) => option.id === value.id}
						sx={{ textTransform: 'none', marginBlock: '1.5rem' }}
						ListboxProps={{
							style: { textTransform: 'none' },
						}}
						renderInput={params => <TextField {...params} label={t('common:channel')} />}
						// eslint-disable-next-line react/prop-types
						onChange={(_, data) => field.onChange(data?.id || undefined)}
					/>
				)}
			/>
			<Box display='flex' gap='1rem' alignItems='center' justifyContent='flex-end'>
				{edit && (
					<LoadingButton
						variant='contained'
						color='error'
						loading={saving}
						sx={{ marginRight: 'auto' }}
						onClick={() => setOpenConfirmation(true)}
					>
						{t('dashboardPage:embeds.form.buttons.delete')}
					</LoadingButton>
				)}
				<LoadingButton
					variant='outlined'
					loading={saving}
					onClick={handleSubmit(saveEmbed)}
					endIcon={<Icon icon={faFloppyDisk} />}
				>
					{t('dashboardPage:embeds.form.buttons.save')}
				</LoadingButton>
				<LoadingButton
					variant='contained'
					loading={saving}
					disabled={!channelId}
					onClick={handleSubmit(sendEmbed)}
					endIcon={<Icon icon={faPaperPlane} />}
				>
					{t(`dashboardPage:embeds.form.buttons.${edit && messageId ? 'edit' : 'send'}`)}
				</LoadingButton>
				{edit && (
					<ConfirmDialog
						title={t('dashboardPage:embeds.confirmEmbedDeletion')}
						open={openConfirmation}
						onClose={() => setOpenConfirmation(false)}
						onConfirm={deleteEmbed}
					/>
				)}
			</Box>
		</>
	);
}
