import '@testing-library/jest-dom';

export const t = (key: string, params?: Record<string, unknown>) => {
	if (key === 'key.with.params' && params) return `key.with.params.${params.param}`;
	return key;
};

jest.mock('next/router', () => ({
	useRouter: () => ({
		locale: 'en',
		defaultLocale: 'en',
		locales: ['en', 'pl'],
		asPath: '/',
	}),
}));
