import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { Chip, ChipProps, styled, Tooltip } from '@mui/material';

import { faMeteor, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

import Icon from '@components/Icon';

interface IProps {
	variant: 'wip' | 'premium' | 'new';
	feature: string;
}

const WiPBadge = styled((props: ChipProps) => (
	<Chip
		{...props}
		clickable
		size='small'
		color='warning'
		variant='outlined'
		label={<Icon icon={faScrewdriverWrench} sx={{ fontSize: '1rem' }} />}
	/>
))(({ theme }) => ({
	color: theme.palette.warning.dark,
	padding: '.2rem',
	lineHeight: 1,
}));

const NewBadge = styled((props: ChipProps) => (
	<Chip {...props} clickable size='small' color='info' variant='outlined' />
))(({ theme }) => ({
	color: theme.palette.info.dark,
	padding: '.2rem',
	lineHeight: 2,
}));

const PremiumBadge = styled((props: ChipProps) => (
	<Chip
		{...props}
		clickable
		size='small'
		variant='outlined'
		label={<Icon icon={faMeteor} sx={{ fontSize: '1rem' }} />}
	/>
))(({ theme }) => ({
	borderColor: theme.palette.warning.light,
	color: theme.palette.warning.light,
	padding: '.2rem',
	lineHeight: 1,
}));

export default function FeatureBadge({ variant, feature }: IProps): JSX.Element {
	const { t } = useTranslation('common');
	const [visited, setVisited] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			const visitedFeatures = JSON.parse(window.localStorage.getItem('visitedFeatures') || '{}');
			if (visitedFeatures[feature]) setVisited(true);
			if (!visitedFeatures[feature]) setVisited(false);
		}, 100);
	}, [feature, router.asPath]);

	return (
		<Tooltip title={t(`featureTags.${variant}`).toString()} placement='right'>
			<div>
				{variant === 'wip' ? (
					<WiPBadge />
				) : variant === 'new' && !visited ? (
					<NewBadge label={t(`featureTags.${variant}`)} />
				) : variant === 'premium' ? (
					<PremiumBadge />
				) : (
					<></>
				)}
			</div>
		</Tooltip>
	);
}
