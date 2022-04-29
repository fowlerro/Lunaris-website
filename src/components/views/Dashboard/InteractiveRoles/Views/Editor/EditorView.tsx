import { useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { FormProvider, UseFormReturn } from 'react-hook-form';

import { styled } from '@mui/material';

import View from '@components/View';
import ConfirmDialog from '@components/Dialogs/ConfirmDialog';

import OptionsCard from '../../Cards/Options';
import RolesCard from '../../Cards/Roles';

import type { InteractiveRolesFormValues } from '../../utils/useInteractiveRolesForm';
import type { GuildChannels } from 'types';
import SubmitCard from '../../Cards/Submit';

interface EditorViewProps {
	form: UseFormReturn<InteractiveRolesFormValues>;
	channels: GuildChannels | undefined;
}

const StyledView = styled(View)({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export default function EditorView({ form, channels }: EditorViewProps) {
	const [openLeaveWarning, setOpenLeaveWarning] = useState(false);
	const { t } = useTranslation('interactiveRolesPage');
	const router = useRouter();
	const guildId = router.query.guildId as string;

	const {
		formState: { isDirty },
	} = form;

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
			<StyledView header={t('editor.header')} nested onClickBack={handleOpenLeaveWarning}>
				<OptionsCard channels={channels} edit />
				<RolesCard />
				<SubmitCard edit />
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
