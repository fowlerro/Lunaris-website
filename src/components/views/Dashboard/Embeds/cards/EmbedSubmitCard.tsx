import useTranslation from 'next-translate/useTranslation';
import { Control, UseFormHandleSubmit, UseFormReset } from 'react-hook-form';

import DashboardCard from '@components/DashboardCard';

import EmbedSubmit from '../EmbedSubmit';

import type { EmbedMessage, GuildChannels } from 'types';

interface IProps {
	handleSubmit: UseFormHandleSubmit<EmbedMessage>;
	reset: UseFormReset<EmbedMessage>;
	control: Control<EmbedMessage>;
	channels: GuildChannels | undefined;
	edit?: boolean;
}

export default function EmbedFormCard({ control, handleSubmit, reset, channels, edit = false }: IProps): JSX.Element {
	const { t } = useTranslation('common');

	return (
		<DashboardCard header={t('submit')} initialExpand>
			<EmbedSubmit control={control} handleSubmit={handleSubmit} reset={reset} channels={channels} edit={edit} />
		</DashboardCard>
	);
}
