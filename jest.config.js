// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');
// module.exports = {
// 	preset: 'ts-jest',
// 	testEnvironment: 'jsdom',
// 	setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
// 	collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
// 	automock: true,

// 	moduleNameMapper: {
// 		'\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
// 			'<rootDir>/__mocks__/fileMock.js',
// 		'@assets/(.*)': '<rootDir>/src/assets/$1',
// 		'@components/(.*)': '<rootDir>/src/components/common/$1',
// 		'@components/layout/(.*)': '<rootDir>/src/components/layout/$1',
// 		'@views/(.*)': '<rootDir>/src/components/views/$1',
// 		'@context/(.*)': '<rootDir>/src/context/$1',
// 		'@layouts/(.*)': '<rootDir>/src/layouts/$1',
// 		'@styles/(.*)': '<rootDir>/src/styles/$1',
// 		'@hooks/(.*)': '<rootDir>/src/utils/hooks/$1',
// 		'@utils/(.*)': '<rootDir>/src/utils/$1',
// 	},
// };

const createJestConfig = nextJest({
	dir: './',
});

const customjestConfig = {
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
	collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],

	moduleNameMapper: {
		'\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/fileMock.js',
		'@assets/(.*)': '<rootDir>/src/assets/$1',
		'@components/layout/(.*)': '<rootDir>/src/components/layout/$1',
		'@components/(.*)': '<rootDir>/src/components/common/$1',
		'@views/(.*)': '<rootDir>/src/components/views/$1',
		'@context/(.*)': '<rootDir>/src/context/$1',
		'@layouts/(.*)': '<rootDir>/src/layouts/$1',
		'@styles/(.*)': '<rootDir>/src/styles/$1',
		'@hooks/(.*)': '<rootDir>/src/utils/hooks/$1',
		'@utils/(.*)': '<rootDir>/src/utils/$1',
	},
};

module.exports = createJestConfig(customjestConfig);
