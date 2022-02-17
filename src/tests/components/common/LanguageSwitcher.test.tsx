import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import LanguageSwitcher from '@components/LanguageSwitcher';

describe('LanguageSwitcher Component', () => {
	it('should renders', () => {
		render(<LanguageSwitcher />);
		const link = screen.getByRole('switch');
		expect(link).toBeInTheDocument();
	});
	it('should renders link', () => {
		render(<LanguageSwitcher />);
		const switchLink = screen.getByRole('switch');
		expect(switchLink).toBeInTheDocument();
	});
	it('should change language', () => {
		render(<LanguageSwitcher />);
		const switchLink = screen.getByRole('switch');
		expect(switchLink).toHaveAttribute('href', '/');
	});
});
