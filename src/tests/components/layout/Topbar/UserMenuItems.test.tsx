import UserMenuItems from '@components/layout/Topbar/UserMenuItems';
import { screen } from '@testing-library/dom';
import renderWithTheme from '@utils/renderWithTheme';
import type { User } from 'types';

describe('Topbar UserMenuItems component', () => {
	it('should render', () => {
		const userMock: User = { discordTag: 'test#0000', discordId: '123', avatar: '1234' };
		renderWithTheme(<UserMenuItems user={userMock} />);
		expect(screen.getAllByRole('link')).toBeTruthy();
	});

	it('should contain Profile Link', () => {
		const userMock: User = { discordTag: 'test#0000', discordId: '123', avatar: '1234' };
		renderWithTheme(<UserMenuItems user={userMock} />);
		expect(screen.getByRole('link', { name: 'profileMenu.profile' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'profileMenu.profile' })).toHaveProperty(
			'href',
			'http://localhost/dashboard'
		);
	});

	it('should contain Servers Link', () => {
		const userMock: User = { discordTag: 'test#0000', discordId: '123', avatar: '1234' };
		renderWithTheme(<UserMenuItems user={userMock} />);
		expect(screen.getByRole('link', { name: 'profileMenu.servers' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'profileMenu.servers' })).toHaveProperty('href', 'http://localhost/server');
	});

	it('should contain Logout Link', () => {
		const userMock: User = { discordTag: 'test#0000', discordId: '123', avatar: '1234' };
		renderWithTheme(<UserMenuItems user={userMock} />);
		expect(screen.getByRole('link', { name: 'profileMenu.logout' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'profileMenu.logout' })).toHaveProperty(
			'href',
			`http://localhost/${process.env.apiDomain}/api/auth/logout`
		);
	});
});
