import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';

import {
	SubmitHandler,
	Control,
	Controller,
	useWatch,
	useFormContext,
	FormProvider,
	UseFormReturn,
} from 'react-hook-form';

import { Button, ToggleButtonGroup, ToggleButton, styled, FormControl, Typography } from '@mui/material';

import { faAdd } from '@fortawesome/free-solid-svg-icons';

import View from '@components/View';
import ConfirmDialog from '@components/Dialogs/ConfirmDialog';
import DashboardCard from '@components/DashboardCard';
import Select, { SelectItem } from '@components/Inputs/Select';
import ChannelSelect from '@components/Inputs/ChannelSelect';
import ControlledTextField from '@components/Inputs/Controlled/TextField';

import useInteractiveRolesForm, { InteractiveRolesFormValues } from './forms/useInteractiveRolesForm';

import { fetcher } from '@utils/utils';
import useLeaveWithChanges from '@hooks/useLeaveWithChanges';

import type { GuildChannels, Role, EmbedMessage } from 'types';
import EmbedCreator from '../Embeds/EmbedCreator';

interface CreatorViewProps {
	form: UseFormReturn<InteractiveRolesFormValues>;
	channels: GuildChannels | undefined;
}

interface InputProps {
	control: Control<InteractiveRolesFormValues>;
}

interface MessageInputProps {
	control: Control<InteractiveRolesFormValues>;
	channels: GuildChannels | undefined;
}

const StyledView = styled(View)({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export default function InteractiveRolesCreator(): JSX.Element {
	const { t } = useTranslation('interactiveRolesPage');
	const router = useRouter();
	const guildId = router.query.guildId as string;
	const view = router.query.view;

	useEffect(() => {
		if (!view) return;
		if (Array.isArray(view) && view.length > 1) router.replace(`/dashboard/${guildId}/interactive-roles/creator/embed`);
		if (Array.isArray(view) && view[0] !== 'embed') router.replace(`/dashboard/${guildId}/interactive-roles/creator`);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [view]);

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
	const { data: roles } = useSWR<Role[]>(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/roles`, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnMount: false,
		revalidateOnReconnect: false,
	});

	const defaultValues: InteractiveRolesFormValues = {
		name: t('creator.defaultName', { default: 'New Interactive Role' }),
		guildId: '',
		channelId: '',
		messageId: '',
		embedId: '',
		type: 'reactions',
		placeholder: '',
		roles: [],
	};

	const form = useInteractiveRolesForm({
		defaultValues,
		channels,
		roles,
	});

	useLeaveWithChanges(form.formState.isDirty);

	const handleEmbedSave = async (embed: EmbedMessage) => {
		await router.push(`/dashboard/${guildId}/interactive-roles/creator`, undefined, { shallow: true });
		if (!embed._id || !embed.channelId) return;
		form.setValue('embedId', embed._id);
		form.setValue('channelId', embed.channelId);
	};

	if (!view) return <CreatorView form={form} channels={channels} />;
	if (view[0] === 'embed')
		return (
			<EmbedCreator
				channels={channels}
				backUrl={`/dashboard/${guildId}/interactive-roles/creator`}
				onEmbedSave={handleEmbedSave}
			/>
		);
	return <>Error</>;
}

function CreatorView({ form, channels }: CreatorViewProps) {
	const [openLeaveWarning, setOpenLeaveWarning] = useState(false);
	const { t } = useTranslation('interactiveRolesPage');
	const router = useRouter();
	const guildId = router.query.guildId as string;

	const {
		control,
		handleSubmit,
		formState: { isDirty },
	} = form;

	const onSubmit: SubmitHandler<InteractiveRolesFormValues> = async values => {
		console.log(values);
	};

	const handleOpenLeaveWarning = () => {
		if (!isDirty) return handleLeave();
		setOpenLeaveWarning(true);
	};

	const handleCloseLeaveWarning = () => {
		setOpenLeaveWarning(false);
	};
	const handleLeave = () => {
		setOpenLeaveWarning(false);
		router.push(`/dashboard/${guildId}/interactive-roles`, undefined, { shallow: true });
	};

	return (
		<FormProvider {...form}>
			<StyledView header={t('creator.header')} nested onClickBack={handleOpenLeaveWarning}>
				<DashboardCard header={t('creator.options')} initialExpand>
					<TypeInput control={control} />
					<MessageInput control={control} channels={channels} />
				</DashboardCard>
				<DashboardCard header={t('creator.roles')} initialExpand>
					{' '}
				</DashboardCard>
				<DashboardCard header={t('creator.submit')} initialExpand>
					<Button variant='contained' onClick={handleSubmit(onSubmit)}>
						{t('common:submit')}
					</Button>
				</DashboardCard>
				<ConfirmDialog
					title={t('common:confirmLeaveWithChanges')}
					open={openLeaveWarning}
					onClose={handleCloseLeaveWarning}
					onConfirm={handleLeave}
				/>
			</StyledView>
		</FormProvider>
	);
}

function TypeInput({ control }: InputProps) {
	const { t } = useTranslation('interactiveRolesPage');
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
				</FormControl>
			)}
		/>
	);
}

function MessageInput({ control, channels }: MessageInputProps) {
	const { t } = useTranslation('interactiveRolesPage');
	const { type } = useWatch({
		control,
	});

	const { setValue } = useFormContext<InteractiveRolesFormValues>();
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (type !== 'reactions') {
			setMessage('embedMessage');
		}
	}, [setValue, type]);

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
				disabled={type !== 'reactions'}
				margin='normal'
			/>
			{(message === 'messageId' || message === 'lastMessage') && (
				<Controller
					name='channelId'
					control={control}
					render={({ field, fieldState }) => (
						<ChannelSelect
							channels={channels ?? { text: [], category: [] }}
							disabled={Boolean(!channels)}
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
					}}
				/>
			)}
			{message === 'embedMessage' && <EmbedMessageSelect channels={channels} />}
		</div>
	);
}

function EmbedMessageSelect({ channels }: { channels: GuildChannels | undefined }) {
	const router = useRouter();
	const guildId = router.query.guildId as string;
	const { t } = useTranslation('interactiveRolesPage');
	const { control, setValue } = useFormContext<InteractiveRolesFormValues>();

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
		console.log('create');
		router.push(`${router.asPath}/embed`, undefined, { shallow: true });
	};

	return (
		<Controller
			control={control}
			name='embedId'
			render={({ field }) => (
				<Select
					items={items}
					disabled={Boolean(!embeds)}
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
				/>
			)}
		/>
	);
}
