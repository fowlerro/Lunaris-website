import { useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Header from '@views/Commands/Header';
import CommandSection from '@views/Commands/CommandSection';
import FormSection from '@views/Commands/FormSection';

const categories = ['moderation', 'misc', 'settings'];

const Commands: NextPage = () => {
	const [searchInput, setSearchInput] = useState('');
	const [category, setCategory] = useState('');
	return (
		<>
			<Head>
				<title>Lunaris - Commands</title>
				<meta name='description' content='Website Dashboard for Discord bot - Lunaris' />
			</Head>
			<Header
				categories={categories}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				category={category}
				setCategory={setCategory}
			/>
			<CommandSection searchInput={searchInput} category={category} />
			<FormSection />
		</>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en', ['common', 'layout', 'commandsPage'])),
		},
	};
};

export default Commands;
