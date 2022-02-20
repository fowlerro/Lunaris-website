import TopbarDesktop from '@components/Topbar/Desktop/TopbarDesktop';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

describe('Desktop Topbar component', () => {
	it('should render', () => {
		render(<TopbarDesktop />);
		expect(screen.getByRole('navigation', { name: 'Topbar' })).toBeInTheDocument();
	});

	it('should render Logo', () => {
		render(<TopbarDesktop />);
		expect(screen.getByRole('img', { name: 'Logo' })).toBeInTheDocument();
	});

	it('should render Menu', () => {
		render(<TopbarDesktop />);
		expect(screen.getByRole('navigation', { name: '' })).toBeInTheDocument();
	});

	it('should render RightItems', () => {
		render(<TopbarDesktop />);
		expect(screen.getByRole('navigation', { name: 'Action buttons' })).toBeInTheDocument();
	});
});
