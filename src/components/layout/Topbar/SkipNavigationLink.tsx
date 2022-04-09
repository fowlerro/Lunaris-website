import { useTranslation } from 'next-i18next';

import { styled } from '@mui/material';

const SkipLink = styled('a')(({ theme }) => ({
	position: 'absolute',
	backgroundColor: theme.colors.background.lighter,
	padding: '.5em .75em',
	borderRadius: '0 0 12px',
	boxShadow: theme.shadows[4],
	transition: 'transform 150ms ease-in',
	textDecoration: 'none',

	transform: 'translateY(-150%)',

	'&:focus': {
		outline: 'none',
		transform: 'translateY(0%)',
	},
}));

export default function SkipNavigationLink(): JSX.Element {
	const { t } = useTranslation('layout');
	return <SkipLink href='#main'>{t('nav.skipNavigation')}</SkipLink>;
}
