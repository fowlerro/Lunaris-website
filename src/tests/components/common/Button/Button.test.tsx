import Button from '@components/Button/Button';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

describe('Button Component', () => {
	it('should render', () => {
		render(<Button>Test</Button>);
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
	});

	it('should render children', () => {
		const Children = () => <a href=''>Test</a>;
		render(
			<Button>
				<Children />
			</Button>
		);
		const children = screen.getByRole('link');
		expect(children).toHaveTextContent('Test');
	});

	it('should trigger onClick event', () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick}>Test</Button>);
		const button = screen.getByRole('button');
		userEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should render with variant prop', () => {
		const variant = 'secondary';
		render(<Button variant={variant}>Test</Button>);
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
	});

	it('should render with size prop', () => {
		const size = 'sm';
		render(<Button size={size}>Test</Button>);
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
	});
});
