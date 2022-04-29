import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';

import { Controller, useFormContext } from 'react-hook-form';

import { FormControl, FormHelperText, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { faAdd } from '@fortawesome/free-solid-svg-icons';

import DashboardCard from '@components/DashboardCard';
import ControlledTextField from '@components/Inputs/Controlled/TextField';
import Select, { SelectItem } from '@components/Inputs/Select';
import ChannelSelect from '@components/Inputs/ChannelSelect';

import { fetcher } from '@utils/utils';

import type { InteractiveRolesFormValues } from '../../utils/useInteractiveRolesForm';
import type { GuildChannels, EmbedMessage } from 'types';

interface OptionsCardProps {
	channels: GuildChannels | undefined;
	edit?: boolean;
}

interface MessageInputProps {
	channels: GuildChannels | undefined;
	edit?: boolean;
}

export default function OptionsCard({ channels, edit = false }: OptionsCardProps): JSX.Element {
	const { t } = useTranslation('interactiveRolesPage');

	return (
		<DashboardCard header={t('creator.options')} initialExpand>
			<TypeInput />
			<MessageInput channels={channels} edit={edit} />
			<SelectMenuPlaceholder />
		</DashboardCard>
	);
}

function TypeInput() {
	const { t } = useTranslation('interactiveRolesPage');

	const {
		control,
		watch,
		formState: { errors },
	} = useFormContext<InteractiveRolesFormValues>();
	const roles = watch('roles');

	return (
		<Controller
			name='type'
			control={control}
			render={({ field }) => (
				<FormControl>
					<Typography id='interactive-roles-type-label' sx={{ marginTop: '1rem' }} gutterBottom>
						{t('form.labels.type.label')}
					</Typography>
					<ToggleButtonGroup
						{...field}
						exclusive
						color='primary'
						size='small'
						aria-labelledby='interactive-roles-type-label'
						disabled={!!roles.length}
						sx={{ '& > *': { fontSize: ['.7rem', '.8rem'] } }}
					>
						<ToggleButton value='reactions' aria-label={t('form.labels.type.reactions')}>
							{t('form.labels.type.reactions')}
						</ToggleButton>
						<ToggleButton value='buttons' aria-label={t('form.labels.type.buttons')}>
							{t('form.labels.type.buttons')}
						</ToggleButton>
						<ToggleButton value='select' aria-label={t('form.labels.type.select')}>
							{t('form.labels.type.select')}
						</ToggleButton>
					</ToggleButtonGroup>
					{errors.type ? <FormHelperText error>{errors.type?.message}</FormHelperText> : null}
				</FormControl>
			)}
		/>
	);
}

function MessageInput({ channels, edit = false }: MessageInputProps) {
	const { t } = useTranslation('interactiveRolesPage');

	const {
		watch,
		control,
		setValue,
		formState: { errors },
	} = useFormContext<InteractiveRolesFormValues>();
	const type = watch('type');
	const embedId = watch('embedId');
	const channelId = watch('channelId');

	const [message, setMessage] = useState(embedId ? 'embedMessage' : 'messageId');

	useEffect(() => {
		if (type !== 'reactions') setMessage('embedMessage');
	}, [type, setValue]);

	useEffect(() => {
		if (message === 'lastMessage' && channelId) {
			const channel = channels?.text.find(channel => channel.id === channelId);
			if (channel && channel.lastMessageId) setValue('messageId', channel.lastMessageId);
		}
		if (message === 'embedMessage') {
			setValue('messageId', '');
		}
		if (message !== 'embedMessage') {
			setValue('embedId', '');
		}
	}, [channels?.text, message, setValue, channelId]);

	const items: SelectItem[] = [
		{
			label: t('form.labels.message.messageId.label'),
			description: t('form.labels.message.messageId.description'),
			value: 'messageId',
		},
		{
			label: t('form.labels.message.lastMessage.label'),
			description: t('form.labels.message.lastMessage.description'),
			value: 'lastMessage',
		},
		{
			label: t('form.labels.message.embedMessage.label'),
			description: t('form.labels.message.embedMessage.description'),
			value: 'embedMessage',
		},
	];

	return (
		<div>
			<Typography sx={{ marginTop: '1.5rem' }} gutterBottom>
				{t('form.labels.message.label')}
			</Typography>
			<Select
				items={items}
				label={t('form.labels.message.label')}
				value={message}
				onChange={e => setMessage(e.target.value)}
				disabled={edit || type !== 'reactions'}
				margin='normal'
			/>
			{(message === 'messageId' || message === 'lastMessage') && (
				<Controller
					name='channelId'
					control={control}
					render={({ field, fieldState }) => (
						<ChannelSelect
							channels={channels ?? { text: [], category: [] }}
							disabled={edit || Boolean(!channels)}
							disabledClearable
							value={field.value}
							onChange={field.onChange}
							error={fieldState.invalid}
							helperText={fieldState.error?.message}
						/>
					)}
				/>
			)}
			{message === 'messageId' && (
				<ControlledTextField
					control={control}
					name='messageId'
					inputProps={{
						label: t('form.labels.message.messageId.label'),
						fullWidth: true,
						error: Boolean(errors.messageId),
						helperText: errors.messageId?.message,
						disabled: edit,
					}}
				/>
			)}
			{message === 'embedMessage' && <EmbedMessageSelect channels={channels} edit={edit} />}
		</div>
	);
}

function EmbedMessageSelect({ channels, edit = false }: { channels: GuildChannels | undefined; edit?: boolean }) {
	const router = useRouter();
	const guildId = router.query.guildId as string;
	const { t } = useTranslation('interactiveRolesPage');
	const {
		control,
		setValue,
		formState: { errors },
	} = useFormContext<InteractiveRolesFormValues>();

	const { data: embeds } = useSWR<EmbedMessage[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/embeds`,
		fetcher
	);

	const items: SelectItem[] =
		embeds
			?.filter(embed => embed._id && embed.channelId)
			?.map(embed => ({
				label: embed.name,
				description: channels?.text?.find(channel => channel.id === embed.channelId)
					? `#${channels.text.find(channel => channel.id === embed.channelId)?.name}`
					: t('list.notSent'),
				value: embed._id as string,
			})) ?? [];

	const handleCreate = () => {
		router.push(`${router.asPath}/embed`, undefined, { shallow: true });
	};

	return (
		<Controller
			control={control}
			name='embedId'
			render={({ field }) => (
				<Select
					items={items}
					disabled={edit || Boolean(!embeds)}
					actions={[
						{
							label: t('form.labels.createEmbedMessage'),
							onClick: handleCreate,
							icon: faAdd,
						},
					]}
					label={t('form.labels.message.embedMessage.label')}
					margin='normal'
					value={field.value}
					onChange={event => {
						const embed = embeds?.find(embed => embed._id === event.target.value);
						if (!embed || !embed.channelId) return;

						setValue('channelId', embed.channelId);
						setValue('messageId', embed.messageId ?? '');
						field.onChange(event);
					}}
					error={Boolean(errors.channelId)}
					helperText={errors.channelId?.message}
				/>
			)}
		/>
	);
}

function SelectMenuPlaceholder() {
	const { t } = useTranslation('interactiveRolesPage');
	const { watch, control } = useFormContext<InteractiveRolesFormValues>();
	const type = watch('type');

	return type === 'select' ? (
		<div>
			<Typography gutterBottom sx={{ marginTop: '1rem' }}>
				{t('form.labels.selectMenuLabel')}
			</Typography>
			<ControlledTextField
				control={control}
				name='placeholder'
				inputProps={{ placeholder: t('form.labels.selectMenuPlaceholder'), fullWidth: true, characterLimit: 150 }}
			/>
		</div>
	) : (
		<></>
	);
}
