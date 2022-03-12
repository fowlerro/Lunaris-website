import { screen } from '@testing-library/dom';
import renderWithTheme from '@utils/renderWithTheme';
import { MobileLoginButton } from '@views/Main/MobileLoginButton';
import useUser from '@hooks/useUser';
jest.mock('@hooks/useUser');
const mockedUseUser = jest.mocked(useUser);

describe('Hero MobileLoginButton component', () => {
	it('should render', () => {
		renderWithTheme(<MobileLoginButton />);
		expect(screen.getByRole('link')).toBeInTheDocument();
	});

	it('should have login href if not logged in', () => {
		mockedUseUser.mockReturnValueOnce(null);
		renderWithTheme(<MobileLoginButton />);
		expect(screen.getByRole('link')).toHaveAttribute('href', `${process.env.API_URL}/auth/discord`);
	});

	it('should have dashboard href if not logged in', () => {
		mockedUseUser.mockReturnValueOnce({ discordId: '123', discordTag: 'test#0000', avatar: '123' });
		renderWithTheme(<MobileLoginButton />);
		expect(screen.getByRole('link')).toHaveAttribute('href', '/dashboard');
	});
});
