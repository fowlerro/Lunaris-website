import MenuItem from '@components/Topbar/MenuItem';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

describe('Topbar MenuItem component', () => {
	it('should render', () => {
		render(<MenuItem href={''} label={''} active={false} />);
		const item = screen.getByRole('listitem');
		expect(item).toBeInTheDocument();
	});
	it('should contain link', () => {
		render(<MenuItem href={''} label={''} active={false} />);
		const item = screen.getByRole('link');
		expect(item).toBeInTheDocument();
	});
	it('should pass href prop', () => {
		const href = '/test';
		render(<MenuItem href={href} label={''} active={false} />);
		const item = screen.getByRole('link');
		expect(item).toHaveAttribute('href', href);
	});

	it('should pass label prop', () => {
		const label = 'testLabel';
		render(<MenuItem href={''} label={label} active={false} />);
		const item = screen.getByRole('link');
		expect(item).toHaveTextContent(label);
	});
});
