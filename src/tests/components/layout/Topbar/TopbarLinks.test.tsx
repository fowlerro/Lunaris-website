import TopbarLinks from '@components/layout/Topbar/TopbarLinks';
import { useMediaQuery } from '@mui/material';
import { screen } from '@testing-library/dom';
import renderWithTheme from '@utils/renderWithTheme';
import useUser from '@hooks/useUser';
import userEvent from '@testing-library/user-event';

jest.mock('@hooks/useUser');
const mockedUseUser = jest.mocked(useUser);

jest.mock('@mui/material', () => {
	const originalModule = jest.requireActual('@mui/material');

	return {
		__esModule: true,
		...originalModule,
		useTheme: jest.fn(() => ({
			breakpoints: {
				up: jest.fn(),
			},
		})),
		useMediaQuery: jest.fn(),
	};
});

const mockedUseMediaQuery = jest.mocked(useMediaQuery);

describe('TopbarLinks component', () => {
	beforeEach(() => {
		mockedUseMediaQuery.mockReturnValue(true);
	});

	it('should render', () => {
		renderWithTheme(<TopbarLinks />);
		expect(screen.getByRole('list', { name: 'Navigation Links' })).toBeInTheDocument();
	});

	it('should contain action buttons', () => {
		renderWithTheme(<TopbarLinks />);
		expect(screen.getByRole('list', { name: 'Action Buttons' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Language switcher' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'common:login' })).toBeInTheDocument();
	});
});

describe('TopbarLinks Mobile component', () => {
	beforeEach(() => {
		mockedUseMediaQuery.mockReturnValue(false);
	});

	it('should render', () => {
		renderWithTheme(<TopbarLinks />);
		expect(screen.getByRole('list', { name: 'Action Buttons' })).toBeInTheDocument();
	});

	it('should contain action buttons', () => {
		renderWithTheme(<TopbarLinks />);
		expect(screen.getByRole('list', { name: 'Action Buttons' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Language switcher' })).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('should toggle drawer with links after clicking hamburger icon', () => {
		renderWithTheme(<TopbarLinks />);
		const hamburgerButton = screen.getByRole('button');
		expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
		userEvent.click(hamburgerButton);
		expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
		expect(screen.getByRole('presentation')).toBeInTheDocument();
	});

	it('should contain links after opening drawer', () => {
		renderWithTheme(<TopbarLinks />);
		userEvent.click(screen.getByRole('button'));
		expect(screen.getByRole('list', { name: 'Navigation Links' })).toBeInTheDocument();
	});

	it('should contain login button', () => {
		renderWithTheme(<TopbarLinks />);
		userEvent.click(screen.getByRole('button'));
		expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute(
			'href',
			`${process.env.apiDomain}/api/auth/discord`
		);
	});

	it('should contain UserMenu if logged in', () => {
		mockedUseUser.mockReturnValue({ discordId: '123', discordTag: 'test#0000', avatar: '123' });
		renderWithTheme(<TopbarLinks />);
		userEvent.click(screen.getByRole('button'));
		expect(screen.getByRole('link', { name: 'profileMenu.profile' })).toBeInTheDocument();
	});
});
