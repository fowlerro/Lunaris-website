import Logo from '@components/layout/Topbar/Logo';
import { screen } from '@testing-library/dom';
import renderWithTheme from '@utils/renderWithTheme';

describe('Topbar Logo component', () => {
	it('should render', () => {
		renderWithTheme(<Logo />);
		expect(screen.getByRole('img')).toBeInTheDocument();
	});
});
