import useTranslation from 'next-translate/useTranslation';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import DashboardCard from '@components/DashboardCard';

import EmbedForm from '../Form';

import type { EmbedMessage } from 'types';

interface IProps {
	register: UseFormRegister<EmbedMessage>;
	control: Control<EmbedMessage>;
	errors: FieldErrors<EmbedMessage>;
}

export default function EmbedFormCard({ register, control, errors }: IProps): JSX.Element {
	const { t } = useTranslation('embedsPage');

	return (
		<DashboardCard header={t('formHeader')} initialExpand>
			<EmbedForm register={register} control={control} errors={errors} />
		</DashboardCard>
	);
}
