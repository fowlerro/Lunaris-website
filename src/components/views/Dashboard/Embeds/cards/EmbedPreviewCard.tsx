import useTranslation from 'next-translate/useTranslation';
import { Control } from 'react-hook-form';

import DashboardCard from '@components/DashboardCard';

import EmbedPreview from '../EmbedPreview';

import type { EmbedMessage } from 'types';

interface IProps {
	control: Control<EmbedMessage>;
}

export default function EmbedFormCard({ control }: IProps): JSX.Element {
	const { t } = useTranslation('embedsPage');

	return (
		<DashboardCard
			header={t('previewHeader')}
			initialExpand
			sx={{
				minWidth: '10rem',
				position: {
					sm: 'inital',
					lg: 'sticky',
				},
				top: 0,
			}}
		>
			<EmbedPreview control={control} />
		</DashboardCard>
	);
}
