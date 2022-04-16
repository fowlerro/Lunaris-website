import { useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

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
	channels: GuildChannels | undefined;
	backUrl?: string;
	onEmbedSave?: (embed: EmbedMessage) => void;
}

const StyledBox = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',

	[theme.breakpoints.up('lg')]: {
		flexDirection: 'row-reverse',
	},
}));

export default function EmbedCreator({ channels, backUrl, onEmbedSave }: IProps): JSX.Element {
	const { t } = useTranslation('embedsPage');
	const router = useRouter();
	const guildId = router.query.guildId as string;
	const [openLeaveWarning, setOpenLeaveWarning] = useState(false);

	const defaultValues: EmbedMessage = {
		name: t('defaultName', { default: 'New Embed' }),
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
		control,
		handleSubmit,
		reset,
		formState: { isDirty },
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
		router.push(backUrl ?? `/dashboard/${guildId}/embeds`, undefined, { shallow: true });
	};

	return (
		<View header={t('creatorHeader')} nested onClickBack={handleOpenLeaveWarning}>
			<StyledBox>
				<Box sx={{ flex: 1 }}>
					<EmbedPreviewCard control={control} />
				</Box>
				<Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
					<EmbedFormCard control={control} />
					<EmbedSubmitCard
						control={control}
						handleSubmit={handleSubmit}
						reset={reset}
						channels={channels}
						backUrl={backUrl}
						onEmbedSave={onEmbedSave}
					/>
				</Box>
			</StyledBox>
			<ConfirmDialog
				title={t('common:confirmLeaveWithChanges')}
				open={openLeaveWarning}
				onClose={handleCloseLeaveWarning}
				onConfirm={handleLeave}
			/>
		</View>
	);
}
