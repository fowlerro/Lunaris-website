import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import { faGear, faHammer, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

import Header from '@views/Commands/Header';
import CommandSection from '@views/Commands/CommandSection';

export const categories = [
	{
		value: 'moderation',
		icon: faShieldHalved,
	},
	{
		value: 'miscellaneous',
		icon: faHammer,
	},
	{
		value: 'settings',
		icon: faGear,
	},
];

const Commands: NextPage = () => {
	const { t } = useTranslation('commandsPage');
	const [searchInput, setSearchInput] = useState('');
	const [category, setCategory] = useState('');
	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name='description' content={t('description')} />
			</Head>
			<Header
				categories={categories}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				category={category}
				setCategory={setCategory}
			/>
			<CommandSection searchInput={searchInput} category={category} />
		</>
	);
};

export default Commands;
