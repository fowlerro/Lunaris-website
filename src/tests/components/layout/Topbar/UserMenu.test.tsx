import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import UserMenu from '@components/layout/Topbar/UserMenu';
import renderWithTheme from '@utils/renderWithTheme';
import useUser from '@hooks/useUser';
jest.mock('@hooks/useUser');
const mockedUseUser = jest.mocked(useUser);

describe('Topbar UserMenu component', () => {
	it('should render', () => {
		renderWithTheme(<UserMenu />);
		expect(screen.getByRole('link')).toBeInTheDocument();
	});

	it('should render login link if not logged in', () => {
		renderWithTheme(<UserMenu />);
		expect(screen.getByRole('link', { name: 'common:login' })).toBeInTheDocument();
	});
	it('should render profile button if logged in', () => {
		mockedUseUser.mockReturnValueOnce({ discordId: '123', discordTag: 'test#0000', avatar: '123' });
		renderWithTheme(<UserMenu />);
		expect(screen.getByRole('button', { name: 'test#0000' })).toBeInTheDocument();
	});
	it('should open profile menu on button click', () => {
		mockedUseUser.mockReturnValueOnce({ discordId: '123', discordTag: 'test#0000', avatar: '123' });
		renderWithTheme(<UserMenu />);
		const button = screen.getByRole('button', { name: 'test#0000' });
		userEvent.click(button);
		expect(screen.getByRole('menu')).toBeInTheDocument();
	});
});
