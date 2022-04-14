import useTranslation from 'next-translate/useTranslation';
import { Control } from 'react-hook-form';

import DashboardCard from '@components/DashboardCard';

import EmbedForm from '../Form';

import type { EmbedMessage } from 'types';

interface IProps {
	control: Control<EmbedMessage>;
}

export default function EmbedFormCard({ control }: IProps): JSX.Element {
	const { t } = useTranslation('embedsPage');

	return (
		<DashboardCard header={t('formHeader')} initialExpand>
			<EmbedForm control={control} />
		</DashboardCard>
	);
}
