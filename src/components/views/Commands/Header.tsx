import { Dispatch, SetStateAction } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InputAdornment, styled, TextField, Typography } from '@mui/material';

import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from '@components/Inputs/Select';

interface IProps {
	categories: { value: string; icon?: IconDefinition }[];
	searchInput: string;
	setSearchInput: Dispatch<SetStateAction<string>>;
	category: string | null;
	setCategory: Dispatch<SetStateAction<string>>;
}

const Section = styled('section')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: theme.colors.background.primary,
	marginInline: '1rem',
	marginTop: '6rem',
	textAlign: 'center',
	alignItems: 'center',

	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		textAlign: 'left',
	},

	[theme.breakpoints.up('lg')]: {
		paddingInline: '10%',
	},
}));

const TextWrapper = styled('div')({
	maxWidth: '500px',
	marginBottom: '2rem',
});

const InputWrapper = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-end',
	flexGrow: 1,
	maxWidth: '400px',
	marginBottom: '2rem',
});

export default function Header({
	categories,
	searchInput,
	setSearchInput,
	category,
	setCategory,
}: IProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<Section>
			<TextWrapper>
				<Typography variant='h1'>{t('common:commands')}</Typography>
				<Typography
					variant='subtitle1'
					paragraph
					role='paragraph'
					sx={{
						color: theme => theme.colors.text.secondary,
						marginTop: '.5rem',
					}}
				>
					{t('commandsPage:headerParagraph')}
				</Typography>
				<Typography
					variant='subtitle1'
					paragraph
					role='paragraph'
					sx={{
						color: theme => theme.colors.text.secondary,
						marginTop: '.5rem',
					}}
				>
					{t('commandsPage:headerSecondParagraph')}
				</Typography>
			</TextWrapper>
			<InputWrapper>
				<TextField
					label={t('commandsPage:searchLabel')}
					type='search'
					fullWidth
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end' sx={{ color: theme => theme.colors.text.primary, fontSize: '1.5rem' }}>
								<FontAwesomeIcon icon={faSearch} />
							</InputAdornment>
						),
					}}
					sx={{ marginBottom: '1rem' }}
				/>
				<Select
					label={t('commandsPage:selectLabel').toString()}
					fullWidth
					items={categories.map(category => ({
						label: t(`commands:categories.${category.value}.label`),
						description: t(`commands:categories.${category.value}.description`),
						icon: category.icon,
						value: category.value,
					}))}
					value={category}
					onChange={e => setCategory(e.target.value)}
				/>
			</InputWrapper>
		</Section>
	);
}
