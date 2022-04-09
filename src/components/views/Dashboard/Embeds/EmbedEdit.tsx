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

import { colors } from '@styles/theme';
import useLeaveWithChanges from '@hooks/useLeaveWithChanges';

import type { EmbedMessage, GuildChannels } from '@types';

interface IProps {
	channels: GuildChannels;
	embed: EmbedMessage;
}

const StyledBox = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',

	[theme.breakpoints.up('lg')]: {
		flexDirection: 'row-reverse',
	},
}));

export default function EmbedEdit({ channels, embed }: IProps): JSX.Element {
	const [openLeaveWarning, setOpenLeaveWarning] = useState(false);
	const router = useRouter();
	const guildId = router.query.guildId as string;
	const { t } = useTranslation();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isDirty },
	} = useEmbedForm({
		defaultValues: {
			_id: embed._id,
			name: embed.name ?? '',
			guildId: embed.guildId ?? '',
			channelId: embed.channelId ?? '',
			messageId: embed.messageId ?? '',
			messageContent: embed.messageContent ?? '',
			embed: {
				author: {
					name: embed?.embed?.author?.name ?? '',
					url: embed?.embed?.author?.url ?? '',
					iconURL: embed?.embed?.author?.iconURL ?? '',
				},
				description: embed?.embed?.description ?? '',
				title: embed?.embed?.title ?? '',
				url: embed?.embed?.url ?? '',
				image: {
					url: embed?.embed?.image?.url ?? '',
				},
				thumbnail: {
					url: embed?.embed?.thumbnail?.url ?? '',
				},
				footer: {
					text: embed?.embed?.footer?.text ?? '',
					iconURL: embed?.embed?.footer?.iconURL ?? '',
				},
				timestamp: embed?.embed?.timestamp ?? undefined,
				fields: embed?.embed?.fields ?? [],
				hexColor: embed?.embed?.hexColor ?? colors.primary.main,
			},
		},
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
		<View header={t('dashboardPage:embeds.editHeader')} nested onClickBack={handleOpenLeaveWarning}>
			<StyledBox>
				<Box sx={{ flex: 1 }}>
					<EmbedPreviewCard control={control} />
				</Box>
				<Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
					<EmbedFormCard register={register} control={control} errors={errors} />
					<EmbedSubmitCard register={register} control={control} handleSubmit={handleSubmit} channels={channels} edit />
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
