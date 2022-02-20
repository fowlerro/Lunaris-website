import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { DesktopLoginButton, MobileLoginButton } from '@components/LoginButton';
import useUser from '@hooks/useUser';
jest.mock('@hooks/useUser');
const mockedUseUser = jest.mocked(useUser);

describe('MobileLoginButton component', () => {
	it('should render', () => {
		render(<MobileLoginButton />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('should render with login url and text if not logged in', () => {
		render(<MobileLoginButton />);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('href', `/${process.env.apiDomain}/api/auth/discord`);
		expect(button).toHaveTextContent('common:login');
	});

	it('should render with dashboard url and text if logged in', () => {
		mockedUseUser.mockReturnValueOnce({ discordId: '123', discordTag: 'test#0000', avatar: '123' });
		render(<MobileLoginButton />);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('href', '/dashboard');
		expect(button).toHaveTextContent('common:gotoDashboard');
	});
});

describe('DesktopLoginButton component', () => {
	it('should render', () => {
		render(<DesktopLoginButton />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('should render with login url and text if not logged in', () => {
		render(<DesktopLoginButton />);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('href', `/${process.env.apiDomain}/api/auth/discord`);
		expect(button).toHaveTextContent('common:login');
	});

	it('should render with dashboard url if logged in', () => {
		mockedUseUser.mockReturnValueOnce({ discordId: '123', discordTag: 'test#0000', avatar: '123' });
		render(<DesktopLoginButton />);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('href', '/dashboard');
	});

	it('should render with avatar if logged in', () => {
		mockedUseUser.mockReturnValueOnce({ discordId: '123', discordTag: 'test#0000', avatar: '123' });
		render(<DesktopLoginButton />);
		expect(screen.getByRole('img', { name: 'Avatar' })).toBeInTheDocument();
	});

	it('should render with discordTag if logged in', () => {
		mockedUseUser.mockReturnValueOnce({ discordId: '123', discordTag: 'test#0000', avatar: '123' });
		render(<DesktopLoginButton />);
		expect(screen.getByRole('heading')).toBeInTheDocument();
		expect(screen.getByRole('heading')).toHaveTextContent('test#0000');
	});
});
