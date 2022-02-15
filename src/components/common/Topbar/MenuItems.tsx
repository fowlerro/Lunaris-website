import { useTranslation } from 'next-i18next';
import React from 'react';
import MenuItem from './MenuItem';

export default function MenuItems(): JSX.Element {
	const { t } = useTranslation('layout');

	return (
		<>
			<MenuItem href='/' label={t('nav.home')} active={true} />
			<MenuItem href='/dashboard' label={t('nav.dashboard')} active={false} />
			<MenuItem href='/commands' label={t('nav.commands')} active={false} />
			<MenuItem href='/modules' label={t('nav.modules')} active={false} />
			<MenuItem href='/contact' label={t('nav.contact')} active={false} />
		</>
	);
}
