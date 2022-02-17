/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
	moduleNameMapper: {
		'@assets/(.*)': '<rootDir>/src/assets/$1',
		'@components/(.*)': '<rootDir>/src/components/common/$1',
		'@views/(.*)': '<rootDir>/src/components/views/$1',
		'@context/(.*)': '<rootDir>/src/context/$1',
		'@layouts/(.*)': '<rootDir>/src/layouts/$1',
		'@styles/(.*)': '<rootDir>/src/styles/$1',
		'@hooks/(.*)': '<rootDir>/src/utils/hooks/$1',
		'@utils/(.*)': '<rootDir>/src/utils/$1',
	},
};
