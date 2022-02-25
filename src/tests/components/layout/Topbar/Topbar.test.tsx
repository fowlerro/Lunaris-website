import Topbar from '@components/layout/Topbar/Topbar';
import { screen } from '@testing-library/dom';
import renderWithTheme from '@utils/renderWithTheme';

describe('Topbar component', () => {
	it('should render', () => {
		renderWithTheme(<Topbar />);
		expect(screen.getByRole('banner')).toBeInTheDocument();
		expect(screen.getByRole('navigation')).toBeInTheDocument();
	});

	it('should contain SkipNavigation Link', () => {
		renderWithTheme(<Topbar />);
		expect(screen.getByRole('link', { name: 'nav.skipNavigation' })).toBeInTheDocument();
	});

	it('should contain Logo', () => {
		renderWithTheme(<Topbar />);
		expect(screen.getByRole('img', { name: 'Logo' })).toBeInTheDocument();
	});

	it('should contain TopbarLinks', () => {
		renderWithTheme(<Topbar />);
		expect(screen.getByRole('list', { name: 'Action Buttons' })).toBeInTheDocument();
	});
});
