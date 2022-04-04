import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { Box, IconButton, styled, Typography } from '@mui/material';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';

interface IProps {
	header?: string;
	action?: ReactNode;
	nested?: boolean;
	children: ReactNode;
	className?: string;
	onClickBack?: () => void;
}

const Section = styled('section')({});

export default function View({
	header,
	action,
	nested = false,
	children,
	className,
	onClickBack,
}: IProps): JSX.Element {
	const router = useRouter();

	const handleClickBack = async () => {
		router.back();
	};

	return (
		<Section className={className}>
			{header && nested && (
				<Box display='flex' alignItems='center' marginBottom='.5rem'>
					{nested && (
						<IconButton
							onClick={onClickBack || handleClickBack}
							sx={{
								width: '3.5rem',
								height: '3.5rem',
								marginRight: '1rem',
							}}
						>
							<Icon icon={faChevronLeft} />
						</IconButton>
					)}
					<Typography
						component='h1'
						sx={{
							fontWeight: theme => theme.typography.fontWeightMedium,
							fontSize: theme => theme.typography.h4.fontSize,
							flex: 1,
						}}
					>
						{header}
					</Typography>
					<Box>{action}</Box>
				</Box>
			)}
			{children}
		</Section>
	);
}
