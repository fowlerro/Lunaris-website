import { screen } from '@testing-library/dom';
import renderWithTheme from '@utils/renderWithTheme';
import Hero from '@views/Main/Hero';
jest.mock('@hooks/useUser');

jest.mock('@mui/material', () => {
	const originalModule = jest.requireActual('@mui/material');

	return {
		__esModule: true,
		...originalModule,
		useTheme: jest.fn(() => ({
			breakpoints: {
				up: jest.fn(),
			},
			colors: {
				text: {
					secondary: '',
				},
			},
		})),
		useMediaQuery: jest.fn(),
	};
});

describe('Hero component', () => {
	it('should render', () => {
		renderWithTheme(<Hero />);
		expect(screen.getByRole('heading')).toBeInTheDocument();
	});

	it('should contain Illustration', () => {
		renderWithTheme(<Hero />);
		expect(screen.getByRole('img')).toBeInTheDocument();
	});
	it('should contain Heading 1', () => {
		renderWithTheme(<Hero />);
		expect(screen.getByRole('heading', { name: 'Lunaris' })).toBeInTheDocument();
	});
	it('should contain Paragraph', () => {
		renderWithTheme(<Hero />);
		expect(screen.getByRole('paragraph')).toBeInTheDocument();
	});
	it('should contain Buttons', () => {
		renderWithTheme(<Hero />);
		expect(screen.getByRole('link', { name: 'common:login' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'common:inviteBot' })).toBeInTheDocument();
	});
});
