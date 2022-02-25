import Links from '@components/layout/Topbar/Links';
import { screen } from '@testing-library/dom';
import renderWithTheme from '@utils/renderWithTheme';

describe('Topbar Links component', () => {
	it('should render', () => {
		renderWithTheme(<Links />);
		expect(screen.getByRole('list')).toBeInTheDocument();
	});

	it('should contain links', () => {
		renderWithTheme(<Links />);
		expect(screen.getAllByRole('link')).toBeTruthy();
	});
});
