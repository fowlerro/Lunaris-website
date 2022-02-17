import { render } from '@testing-library/react';
import LanguageSwitcher from '@components/LanguageSwitcher';

describe('LanguageSwitcher Component', () => {
	it('should renders', () => {
		const res = render(<LanguageSwitcher />);
		expect(res).toBeTruthy();
	});
	it('should renders link', () => {
		const res = render(<LanguageSwitcher />);
		const switchLink = res.getByRole('switch');
		expect(switchLink).toBeTruthy();
	});
	it('should change language', () => {
		const res = render(<LanguageSwitcher />);
		const switchLink = res.getByRole('switch');
		expect(switchLink).toHaveAttribute('href', '/');
	});
});
