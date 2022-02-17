import { useTranslation } from 'next-i18next';
import React from 'react';
import ModuleItem from './ModuleItem';

interface IProps {
	modules: string[];
}

export default function ModulesDesktop({ modules }: IProps): JSX.Element {
	const { t } = useTranslation();
	return (
		<>
			{modules.map(module => (
				<ModuleItem
					id={module}
					key={module}
					title={t(`modules:${module}.title`)}
					description={t(`modules:${module}.shortDesc`)}
				/>
			))}
		</>
	);
}
