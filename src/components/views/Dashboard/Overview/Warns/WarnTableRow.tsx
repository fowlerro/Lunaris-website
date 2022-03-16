import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'next-i18next';
import moment from 'moment';

import { Box, Collapse, IconButton, styled, TableCell, TableRow, Tooltip, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import useIsDesktop from '@hooks/useIsDesktop';

import type { WarnedUser } from 'types';

interface TableRowProps {
	warnedUser: WarnedUser;
}

interface ParentRowProps {
	userTag: string;
	warn: WarnedUser['warns'][0];
}

interface RowProps {
	userTag: string;
	moderatorTag: string;
	reason: string | null;
	date: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	borderBottom: 'unset',
	borderTop: `1px solid ${theme.palette.divider}`,
}));

export default function WarnTableRow({ warnedUser }: TableRowProps): JSX.Element {
	const userTag = `${warnedUser.user.username}#${warnedUser.user.discriminator}`;

	return (
		<>
			{warnedUser.warns.map(warn => (
				<Row key={warn._id} userTag={userTag} warn={warn} />
			))}
		</>
	);
}

function Row({ userTag, warn }: ParentRowProps) {
	const [open, setOpen] = useState(false);
	const isDesktop = useIsDesktop();

	const moderatorTag = `${warn.executor.username}#${warn.executor.discriminator}`;
	const date = moment(warn.date).format('HH:mm:ss DD/MM');
	const { reason } = warn;

	const RowComponent = isDesktop ? DesktopRow : MobileRow;

	return (
		<RowComponent
			userTag={userTag}
			moderatorTag={moderatorTag}
			reason={reason}
			date={date}
			open={open}
			setOpen={setOpen}
		/>
	);
}

function MobileRow({ userTag, moderatorTag, reason, date, open, setOpen }: RowProps) {
	const { t } = useTranslation('dashboardPage');
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
							<Typography variant='h6'>{t('date')}</Typography>
							<Typography variant='body2' gutterBottom>
								{date}
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

function DesktopRow({ userTag, moderatorTag, reason, date, open, setOpen }: RowProps) {
	const { t } = useTranslation('dashboardPage');
	return (
		<>
			<TableRow>
				<StyledTableCell>{userTag}</StyledTableCell>
				<StyledTableCell>{moderatorTag}</StyledTableCell>
				<StyledTableCell sx={{ width: 'min-content' }}>{date}</StyledTableCell>
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
					<TableCell sx={{ paddingBlock: 0, borderBottom: 0 }} />
				</TableRow>
			)}
		</>
	);
}
