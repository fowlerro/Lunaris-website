import type { NextPage } from 'next';
import Head from 'next/head';

import Header from '@views/Modules/Header';
import ModuleSection from '@views/Modules/ModuleSection';
import FormSection from '@views/Modules/FormSection';

const Modules: NextPage = () => {
	return (
		<>
			<Head>
				<title>Lunaris - Modules</title>
				<meta name='description' content='Website Dashboard for Discord bot - Lunaris' />
			</Head>
			<Header />
			<ModuleSection />
			<FormSection />
		</>
	);
};

export default Modules;
