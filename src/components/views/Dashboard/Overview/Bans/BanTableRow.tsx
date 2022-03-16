import { useState, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'next-i18next';
import moment from 'moment';

import { Box, Collapse, IconButton, styled, TableCell, TableRow, Tooltip, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import useIsDesktop from '@hooks/useIsDesktop';

import type { Ban } from 'types';

interface TableRowProps {
	ban: Ban;
}

interface RowProps {
	userTag: string;
	moderatorTag: string;
	reason: string | null;
	time: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	borderBottom: 'unset',
	borderTop: `1px solid ${theme.palette.divider}`,
}));

export default function BanTableRow({ ban }: TableRowProps): JSX.Element {
	const [open, setOpen] = useState(false);
	const isDesktop = useIsDesktop();

	const { t } = useTranslation('common');

	const userTag = `${ban.user.username}#${ban.user.discriminator}`;
	const moderatorTag = ban.executor ? `${ban.executor.username}#${ban.executor.discriminator}` : t('unknown');
	const time = ban.time ? moment(ban.time).calendar() : '-';

	const Row = isDesktop ? DesktopRow : MobileRow;

	return (
		<Row userTag={userTag} moderatorTag={moderatorTag} reason={ban.reason} time={time} open={open} setOpen={setOpen} />
	);
}

function MobileRow({ userTag, moderatorTag, reason, time, open, setOpen }: RowProps) {
	const { t } = useTranslation('common');
	return (
		<>
			<TableRow>
				<StyledTableCell>{userTag}</StyledTableCell>
				<StyledTableCell padding='checkbox'>
					<IconButton aria-label='expand reason' size='small' onClick={() => setOpen(!open)}>
						<FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
					</IconButton>
				</StyledTableCell>
			</TableRow>
			<TableRow>
				<TableCell sx={{ paddingBlock: 0, borderBottom: 0 }}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{ marginBottom: '1rem' }}>
							<Typography variant='h6'>{t('moderator')}</Typography>
							<Typography variant='body2' gutterBottom>
								{moderatorTag}
							</Typography>
							<Typography variant='h6'>{t('until')}</Typography>
							<Typography variant='body2' gutterBottom>
								{time}
							</Typography>
							<Typography variant='h6'>{t('reason')}</Typography>
							<Typography variant='body2' gutterBottom>
								{reason || '-'}
							</Typography>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

function DesktopRow({ userTag, moderatorTag, reason, time, open, setOpen }: RowProps) {
	const { t } = useTranslation('dashboardPage');
	return (
		<>
			<TableRow>
				<StyledTableCell>{userTag}</StyledTableCell>
				<StyledTableCell>{moderatorTag}</StyledTableCell>
				<StyledTableCell>{time}</StyledTableCell>
				<StyledTableCell padding='checkbox'>
					{reason && (
						<Tooltip title={t(open ? 'hideReason' : 'expandReason').toString()}>
							<IconButton aria-label='expand reason' size='small' onClick={() => setOpen(!open)}>
								<FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
							</IconButton>
						</Tooltip>
					)}
				</StyledTableCell>
			</TableRow>
			{reason && (
				<TableRow>
					<TableCell sx={{ paddingBlock: 0, borderBottom: 0 }} colSpan={3}>
						<Collapse in={open} timeout='auto' unmountOnExit>
							<Box sx={{ marginBottom: '1rem' }}>
								<Typography variant='h6'>Reason</Typography>
								<Typography variant='body2' gutterBottom>
									{reason}
								</Typography>
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			)}
		</>
	);
}
