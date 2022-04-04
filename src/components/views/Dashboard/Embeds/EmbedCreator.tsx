import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Box, styled } from '@mui/material';

import View from '@components/View';
import ConfirmDialog from '@components/Dialogs/ConfirmDialog';

import EmbedPreviewCard from './cards/EmbedPreviewCard';
import EmbedFormCard from './cards/EmbedFormCard';
import EmbedSubmitCard from './cards/EmbedSubmitCard';
import useEmbedForm from './utils/useEmbedForm';

import useLeaveWithChanges from '@hooks/useLeaveWithChanges';
import { colors } from '@styles/theme';

import type { EmbedMessage, GuildChannels } from 'types';

interface IProps {
	channels: GuildChannels;
}

const StyledBox = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',

	[theme.breakpoints.up('lg')]: {
		flexDirection: 'row-reverse',
	},
}));

export default function EmbedCreator({ channels }: IProps): JSX.Element {
	const { t } = useTranslation();
	const router = useRouter();
	const guildId = router.query.guildId as string;
	const [openLeaveWarning, setOpenLeaveWarning] = useState(false);

	const defaultValues: EmbedMessage = {
		name: t('dashboardPage:embeds.defaultName', { defaultValue: 'New Embed' }),
		guildId: '',
		channelId: undefined,
		messageId: '',
		messageContent: '',
		embed: {
			hexColor: colors.primary.main as EmbedMessage['embed']['hexColor'],
			fields: [],
			author: {
				name: '',
				url: '',
				iconURL: '',
			},
			title: '',
			url: '',
			description: '',
			image: {
				url: '',
			},
			thumbnail: {
				url: '',
			},
			footer: {
				text: '',
				iconURL: '',
			},
			timestamp: undefined,
		},
	};

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isDirty },
	} = useEmbedForm({
		defaultValues,
		channels,
	});

	useLeaveWithChanges(isDirty);

	const handleOpenLeaveWarning = () => {
		if (!isDirty) return handleLeave();
		setOpenLeaveWarning(true);
	};

	const handleCloseLeaveWarning = () => {
		setOpenLeaveWarning(false);
	};
	const handleLeave = () => {
		setOpenLeaveWarning(false);
		router.push(`/dashboard/${guildId}/embeds`, undefined, { shallow: true });
	};

	return (
		<View header={t('dashboardPage:embeds.creatorHeader')} nested onClickBack={handleOpenLeaveWarning}>
			<StyledBox>
				<Box sx={{ flex: 1 }}>
					<EmbedPreviewCard control={control} />
				</Box>
				<Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
					<EmbedFormCard register={register} control={control} errors={errors} />
					<EmbedSubmitCard register={register} control={control} handleSubmit={handleSubmit} channels={channels} />
				</Box>
			</StyledBox>
			<ConfirmDialog
				title={t('dashboardPage:embeds.confirmLeaveWithChanges')}
				open={openLeaveWarning}
				onClose={handleCloseLeaveWarning}
				onConfirm={handleLeave}
			/>
		</View>
	);
}
