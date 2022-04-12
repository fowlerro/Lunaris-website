import useTranslation from 'next-translate/useTranslation';
import { Control, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

import DashboardCard from '@components/DashboardCard';

import EmbedSubmit from '../EmbedSubmit';

import type { EmbedMessage, GuildChannels } from 'types';

interface IProps {
	register: UseFormRegister<EmbedMessage>;
	handleSubmit: UseFormHandleSubmit<EmbedMessage>;
	control: Control<EmbedMessage>;
	channels: GuildChannels;
	edit?: boolean;
}

export default function EmbedFormCard({
	register,
	control,
	handleSubmit,
	channels,
	edit = false,
}: IProps): JSX.Element {
	const { t } = useTranslation('common');

	return (
		<DashboardCard header={t('submit')} initialExpand>
			<EmbedSubmit register={register} control={control} handleSubmit={handleSubmit} channels={channels} edit={edit} />
		</DashboardCard>
	);
}
