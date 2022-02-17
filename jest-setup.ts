import '@testing-library/jest-dom';
import { i18n } from 'next-i18next';
import { initReactI18next } from 'react-i18next';

export const t = (key: string, params?: Record<string, unknown>) => {
	if (key === 'key.with.params' && params) return `key.with.params.${params.param}`;
	return key;
};

i18n?.use(initReactI18next).init({
	lng: 'en',
	fallbackLng: 'en',
	ns: ['common'],
	defaultNS: 'common',
	resources: {
		en: {
			common: {},
		},
	},
});

jest.mock('next-i18next', () => ({
	useTranslation: () => ({
		t,
		i18n: {
			language: 'en',
			changeLanguage: jest.fn().mockImplementation((lang: string) => console.log(lang)),
		},
	}),
}));

jest.mock('next/router', () => ({
	useRouter: () => ({
		locale: 'en',
		defaultLocale: 'en',
		locales: ['en', 'pl'],
		asPath: '/',
	}),
}));
