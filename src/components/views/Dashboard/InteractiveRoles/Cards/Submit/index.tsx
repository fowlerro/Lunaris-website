import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';

import { faFloppyDisk, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';
import DashboardCard, { DashboardCardContainer } from '@components/DashboardCard';

import type { InteractiveRolesFormValues } from '../../utils/useInteractiveRolesForm';
import ControlledTextField from '@components/Inputs/Controlled/TextField';
import useGuildId from '@hooks/useGuildId';
import axios from 'axios';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';

export default function SubmitCard({ edit = false }: { edit?: boolean }): JSX.Element {
	const { t } = useTranslation('interactiveRolesPage');
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const guildId = useGuildId();
	const interactiveRoleId = router.query.interactiveRoleId as string | undefined;
	const { mutate } = useSWRConfig();

	const { control, handleSubmit, reset } = useFormContext<InteractiveRolesFormValues>();

	const onSend: SubmitHandler<InteractiveRolesFormValues> = async values => {
		if (loading) return;
		setLoading(true);
		const { data } = await axios.put(
			`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/interactive-roles`,
			{
				...values,
				_id: interactiveRoleId,
			},
			{
				withCredentials: true,
			}
		);
		if (!data) {
			setLoading(false);
			return;
		}
		mutate(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/interactive-roles`);
		if (!edit) router.push(`/dashboard/${guildId}/interactive-roles`);
		if (edit)
			reset({
				...values,
				_id: interactiveRoleId,
			});
		setLoading(false);
	};

	return (
		<DashboardCard header={t('creator.submit')}>
			<DashboardCardContainer sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
				<ControlledTextField
					control={control}
					name='name'
					inputProps={{
						label: t('form.labels.interactiveRolesName'),
						characterLimit: 32,
						fullWidth: true,
						sx: {
							marginTop: '1rem',
						},
					}}
				/>
				<LoadingButton
					variant='contained'
					loading={loading}
					onClick={handleSubmit(onSend)}
					endIcon={<Icon icon={edit ? faFloppyDisk : faPaperPlane} />}
				>
					{edit ? t('common:save') : t('common:send')}
				</LoadingButton>
			</DashboardCardContainer>
		</DashboardCard>
	);
}
