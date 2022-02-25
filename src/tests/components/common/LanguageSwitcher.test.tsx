import { screen } from '@testing-library/dom';
import LanguageSwitcher from '@components/LanguageSwitcher';
import renderWithTheme from '@utils/renderWithTheme';

describe('LanguageSwitcher Component', () => {
	it('should renders', () => {
		renderWithTheme(<LanguageSwitcher />);
		const link = screen.getByRole('link');
		expect(link).toBeInTheDocument();
	});
	it('should change language', () => {
		renderWithTheme(<LanguageSwitcher />);
		const switchLink = screen.getByRole('link');
		expect(switchLink).toHaveAttribute('href', '/');
	});
});
