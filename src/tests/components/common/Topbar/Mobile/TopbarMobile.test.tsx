import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import TopbarMobile from '@components/Topbar/Mobile/TopbarMobile';

describe('Mobile Topbar component', () => {
	it('should render', () => {
		render(<TopbarMobile />);
		expect(screen.getByRole('navigation', { name: 'Topbar' })).toBeInTheDocument();
	});

	it('should render Logo', () => {
		render(<TopbarMobile />);
		expect(screen.getByRole('img', { name: 'Logo' })).toBeInTheDocument();
	});

	it('should render RightItems', () => {
		render(<TopbarMobile />);
		expect(screen.getByRole('navigation', { name: 'Action buttons' })).toBeInTheDocument();
	});

	it('should render Menu', () => {
		render(<TopbarMobile />);
		expect(screen.getByRole('navigation', { name: '' })).toBeInTheDocument();
	});
});
