import UserMenuItemsMobile from '@components/layout/Topbar/UserMenuItemsMobile';
import { screen } from '@testing-library/dom';
import renderWithTheme from '@utils/renderWithTheme';
import type { User } from 'types';

describe('Topbar UserMenuItemsMobile component', () => {
	it('should render', () => {
		const userMock: User = { discordTag: 'test#0000', discordId: '123', avatar: '1234', banner: null };
		renderWithTheme(<UserMenuItemsMobile user={userMock} />);
		expect(screen.getAllByRole('link')).toBeTruthy();
	});

	it('should contain Profile Link', () => {
		const userMock: User = { discordTag: 'test#0000', discordId: '123', avatar: '1234', banner: null };
		renderWithTheme(<UserMenuItemsMobile user={userMock} />);
		expect(screen.getByRole('link', { name: 'profileMenu.profile' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'profileMenu.profile' })).toHaveProperty(
			'href',
			'http://localhost/dashboard'
		);
	});

	it('should contain Servers Link', () => {
		const userMock: User = { discordTag: 'test#0000', discordId: '123', avatar: '1234', banner: null };
		renderWithTheme(<UserMenuItemsMobile user={userMock} />);
		expect(screen.getByRole('link', { name: 'profileMenu.servers' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'profileMenu.servers' })).toHaveProperty(
			'href',
			'http://localhost/servers'
		);
	});

	it('should contain Logout Link', () => {
		const userMock: User = { discordTag: 'test#0000', discordId: '123', avatar: '1234', banner: null };
		renderWithTheme(<UserMenuItemsMobile user={userMock} />);
		expect(screen.getByRole('link', { name: 'profileMenu.logout' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'profileMenu.logout' })).toHaveProperty(
			'href',
			`http://localhost/${process.env.NEXT_PUBLIC_API_URL}/auth/logout`
		);
	});
});
