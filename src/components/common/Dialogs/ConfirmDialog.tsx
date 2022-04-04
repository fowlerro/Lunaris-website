import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useTranslation } from 'next-i18next';

interface IProps {
	open: boolean;
	title: string;
	onClose: () => void;
	onConfirm: () => void;
}

export default function ConfirmDialog({ open, title, onClose, onConfirm }: IProps): JSX.Element {
	const { t } = useTranslation('common');

	const handleConfirm = () => {
		onConfirm();
		onClose();
	};
	return (
		<Dialog open={open} onClose={onClose} aria-labelledby='dialog-title'>
			<DialogTitle id='dialog-title'>{title}</DialogTitle>
			<DialogActions>
				<Button onClick={onClose} size='small'>
					{t('cancel')}
				</Button>
				<Button color='error' onClick={handleConfirm} variant='contained' size='small'>
					{`${t('confirm')}!`}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
