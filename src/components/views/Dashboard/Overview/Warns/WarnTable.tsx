import { useTranslation } from 'next-i18next';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import WarnTableRow from './WarnTableRow';

import useIsDesktop from '@hooks/useIsDesktop';

import type { WarnedUser } from 'types';

interface IProps {
	warnedUsers: WarnedUser[];
}

export default function WarnTable({ warnedUsers }: IProps): JSX.Element {
	const { t } = useTranslation('common');
	const isDesktop = useIsDesktop();
	return (
		<TableContainer>
			<Table
				size={isDesktop ? 'medium' : 'small'}
				aria-label='collapsible warns table'
				sx={{ borderCollapse: 'collapse' }}
			>
				<TableHead>
					<TableRow>
						<TableCell colSpan={4}>
							<Typography variant='h3' sx={{ textAlign: 'center' }}>
								Warns
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow sx={{ margin: '1rem' }}>
						<TableCell>{t('user')}</TableCell>
						{isDesktop && (
							<>
								<TableCell>{t('moderator')}</TableCell>
								<TableCell>{t('date')}</TableCell>
							</>
						)}
						<TableCell />
					</TableRow>
				</TableHead>
				<TableBody>
					{warnedUsers.map(warnedUser => (
						<WarnTableRow key={warnedUser.user.id} warnedUser={warnedUser} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
