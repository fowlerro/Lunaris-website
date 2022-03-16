import { useTranslation } from 'next-i18next';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import BanTableRow from './BanTableRow';

import useIsDesktop from '@hooks/useIsDesktop';

import type { Ban } from 'types';

interface IProps {
	bans: Ban[];
}

export default function BanTable({ bans }: IProps): JSX.Element {
	const { t } = useTranslation('common');
	const isDesktop = useIsDesktop();

	return (
		<TableContainer>
			<Table
				size={isDesktop ? 'medium' : 'small'}
				aria-label='collapsible bans table'
				sx={{ borderCollapse: 'collapse' }}
			>
				<TableHead>
					<TableRow>
						<TableCell colSpan={4}>
							<Typography variant='h3' sx={{ textAlign: 'center' }}>
								Bans
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>{t('user')}</TableCell>
						{isDesktop && (
							<>
								<TableCell>{t('moderator')}</TableCell>
								<TableCell>{t('until')}</TableCell>
							</>
						)}
						<TableCell />
					</TableRow>
				</TableHead>
				<TableBody>
					{bans.map(ban => (
						<BanTableRow key={ban.user.id} ban={ban} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
