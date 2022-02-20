import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Logo from '@components/Topbar/Logo';

describe('Topbar Logo component', () => {
	it('should render', () => {
		render(<Logo />);
		const logo = screen.getByRole('img', { name: 'Logo' });
		expect(logo).toBeInTheDocument();
	});

	it('should have src attribute', () => {
		render(<Logo />);
		const logo = screen.getByRole('img', { name: 'Logo' });
		expect(logo).toHaveAttribute('src');
	});
});
