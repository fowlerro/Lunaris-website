import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { faSave } from '@fortawesome/free-solid-svg-icons';

import Icon from './Icon';

interface IProps {
	isDataChanged: boolean;
	onSave: () => void;
	onReset: () => void;
}

function SlideTransition(props: SlideProps) {
	return <Slide {...props} direction='up' />;
}

export default function DataSaveToaster({ isDataChanged, onSave, onReset }: IProps): JSX.Element {
	const { t } = useTranslation();

	const [isSaving, setIsSaving] = useState(false);

	const handleSave = async () => {
		setIsSaving(true);
		await onSave();
		setIsSaving(false);
	};

	return (
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			open={isDataChanged}
			TransitionComponent={SlideTransition}
		>
			<Alert
				severity='error'
				sx={{
					backgroundColor: theme => theme.colors.background.primary,
					boxShadow: theme => theme.shadows[6],

					'.MuiAlert-action': {
						display: 'flex',
						flexDirection: ['column', 'row'],
					},
				}}
				variant='filled'
				action={
					<>
						<LoadingButton
							size='small'
							loading={isSaving}
							color='inherit'
							onClick={() => onReset()}
							sx={{ marginRight: '1rem' }}
						>
							{t('common:reset')}
						</LoadingButton>
						<LoadingButton
							size='small'
							loading={isSaving}
							color='success'
							variant='contained'
							loadingPosition='start'
							startIcon={<Icon icon={faSave} />}
							onClick={handleSave}
						>
							{t('common:save')}
						</LoadingButton>
					</>
				}
			>
				{t('dashboardPage:autoRoles.unsavedData')}
			</Alert>
		</Snackbar>
	);
}
