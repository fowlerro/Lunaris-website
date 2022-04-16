import { useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useSWRConfig } from 'swr';
import axios from 'axios';

import { Control, Controller, SubmitHandler, UseFormHandleSubmit, UseFormReset, useWatch } from 'react-hook-form';

import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { faFloppyDisk, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import ConfirmDialog from '@components/Dialogs/ConfirmDialog';
import ChannelSelect from '@components/Inputs/ChannelSelect';
import Icon from '@components/Icon';

import type { EmbedMessage, GuildChannels } from 'types';
import ControlledTextField from '@components/Inputs/Controlled/TextField';

interface IProps {
	control: Control<EmbedMessage>;
	handleSubmit: UseFormHandleSubmit<EmbedMessage>;
	reset: UseFormReset<EmbedMessage>;
	channels: GuildChannels | undefined;
	edit?: boolean;
	backUrl?: string;
	onEmbedSave?: (embed: EmbedMessage) => void;
}

export default function EmbedSubmit({
	handleSubmit,
	reset,
	control,
	channels,
	edit = false,
	backUrl,
	onEmbedSave,
}: IProps): JSX.Element {
	const { t } = useTranslation('embedsPage');
	const { mutate } = useSWRConfig();
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
			`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/embeds`,
			{ embedMessage },
			{
				withCredentials: true,
			}
		);
		if (!data) {
			setSaving(false);
			return;
		}
		mutate(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/embeds`);
		if (!edit) router.push(`/dashboard/${guildId}/embeds`);
		if (edit) reset(embedMessage);
		setSaving(false);
	};

	const saveEmbed: SubmitHandler<EmbedMessage> = async embedMessage => {
		if (saving) return;
		setSaving(true);
		const { data } = await axios.put(
			`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/embeds`,
			{ embedMessage, withoutSending: true },
			{
				withCredentials: true,
			}
		);
		if (!data) {
			setSaving(false);
			return;
		}
		await mutate(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/embeds`);
		if (backUrl && onEmbedSave) {
			setSaving(false);
			return onEmbedSave(data);
		}
		if (!edit) router.push(`/dashboard/${guildId}/embeds`);
		if (edit) reset(embedMessage);
		setSaving(false);
	};

	const deleteEmbed = async () => {
		const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/embeds`, {
			data: {
				embedId,
			},
			withCredentials: true,
		});
		if (data) {
			mutate(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/embeds`);
			router.push(`/dashboard/${guildId}/embeds`);
		}
	};

	return (
		<>
			<ControlledTextField
				name='name'
				control={control}
				inputProps={{
					characterLimit: 32,
					fullWidth: true,
					label: t('form.labels.embedName'),
					sx: {
						marginTop: '1rem',
					},
				}}
			/>
			{channels ? (
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
			) : null}
			<Box
				display='flex'
				gap='1rem'
				alignItems='center'
				justifyContent='flex-end'
				sx={{ flexDirection: ['column-reverse', 'row'] }}
			>
				{backUrl ? (
					<>
						<LoadingButton
							variant='contained'
							loading={saving}
							disabled={!channelId}
							onClick={handleSubmit(saveEmbed)}
							endIcon={<Icon icon={faFloppyDisk} />}
						>
							{t('common:submit')}
						</LoadingButton>
					</>
				) : (
					<>
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
					</>
				)}
			</Box>
		</>
	);
}
