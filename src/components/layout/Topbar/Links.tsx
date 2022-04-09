import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'next-i18next';

import { List, ListItem, styled } from '@mui/material';

import Link from '@components/Link';

interface IProps {
	setExpanded?: Dispatch<SetStateAction<boolean>>;
}

const StyledList = styled(List)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	paddingTop: '9em',
	paddingBottom: '3em',
	rowGap: '1rem',

	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
		background: 0,
		padding: 0,
	},
}));

export const LinkItem = styled(ListItem)(({ theme }) => ({
	flexBasis: 'fit-content',
	margin: 0,
	'& a': {
		cursor: 'pointer',
		width: '100%',
		textAlign: 'center',
		textDecoration: 'none',

		[theme.breakpoints.up('md')]: {
			position: 'relative',

			'&::after': {
				content: '""',
				position: 'absolute',
				width: '100%',
				transform: 'scaleX(0)',
				height: '0.125rem',
				bottom: 0,
				left: 0,
				background: theme.colors.primary.main,
				transformOrigin: 'bottom',
				transition: 'transform 200ms ease-out',
			},

			'&:hover::after, &:focus::after': {
				transform: 'scaleX(100%)',
			},
		},
	},
}));

export default function Links({ setExpanded }: IProps): JSX.Element {
	const { t } = useTranslation('layout');
	return (
		<StyledList aria-label='Navigation Links' id='navLinks' onClick={() => setExpanded?.(false)}>
			<LinkItem>
				<Link href='/' noLinkStyle tabIndex={0}>
					{t('nav.home')}
				</Link>
			</LinkItem>
			<LinkItem>
				<Link href='/commands' noLinkStyle tabIndex={0}>
					{t('nav.commands')}
				</Link>
			</LinkItem>
			<LinkItem>
				<Link href='/modules' noLinkStyle tabIndex={0}>
					{t('nav.modules')}
				</Link>
			</LinkItem>
			<LinkItem>
				<Link href='/contact' noLinkStyle tabIndex={0}>
					{t('nav.contact')}
				</Link>
			</LinkItem>
		</StyledList>
	);
}
