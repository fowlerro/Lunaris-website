import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SkipNavigationLink from '@components/layout/Topbar/SkipNavigationLink';
import renderWithTheme from '@utils/renderWithTheme';

describe('Topbar SkipNavigationLink component', () => {
	it('should render', () => {
		renderWithTheme(<SkipNavigationLink />);
		expect(screen.getByRole('link')).toBeInTheDocument();
	});

	it('should have text content', () => {
		renderWithTheme(<SkipNavigationLink />);
		expect(screen.getByRole('link')).toHaveTextContent('nav.skipNavigation');
	});

	it('should be focusable', () => {
		renderWithTheme(<SkipNavigationLink />);
		const link = screen.getByRole('link');
		userEvent.tab();
		expect(link).toHaveFocus();
	});

	it('should skip to main content', () => {
		renderWithTheme(<SkipNavigationLink />);
		expect(screen.getByRole('link')).toHaveAttribute('href', '#main');
	});
});
