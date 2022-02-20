import { Dispatch, SetStateAction } from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import TopbarRightItems from '@components/Topbar/Mobile/TopbarRightItems';
import userEvent from '@testing-library/user-event';

describe('Mobile Topbar RightItems component', () => {
	let expanded = false;
	const setExpanded: Dispatch<SetStateAction<boolean>> = (value: SetStateAction<boolean>) => {
		expanded = !!value;
	};
	it('should render', () => {
		render(<TopbarRightItems expanded={expanded} setExpanded={setExpanded} />);
		expect(screen.getByRole('navigation')).toBeInTheDocument();
	});

	it('should render LanguageSwitcher', () => {
		render(<TopbarRightItems expanded={expanded} setExpanded={setExpanded} />);
		expect(screen.getByRole('switch', { name: 'Language switcher' })).toBeInTheDocument();
	});

	it('should render Notifications Icon', () => {
		render(<TopbarRightItems expanded={expanded} setExpanded={setExpanded} />);
		expect(screen.getByRole('listitem', { name: 'Notifications' })).toBeInTheDocument();
	});

	it('should render Hamburger Button', () => {
		render(<TopbarRightItems expanded={expanded} setExpanded={setExpanded} />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('should expand nav menu after clicking button', () => {
		render(<TopbarRightItems expanded={expanded} setExpanded={setExpanded} />);
		const button = screen.getByRole('button');
		userEvent.click(button);
		expect(expanded).toBeTruthy();
	});

	it('should change aria-expanded attribute after click', () => {
		render(<TopbarRightItems expanded={expanded} setExpanded={setExpanded} />);
		const button = screen.getByRole('button');
		userEvent.click(button);
		expect(button).toHaveAttribute('aria-expanded', 'true');
	});

	it('should switch between expanding and collapsing menu', () => {
		const { rerender } = render(<TopbarRightItems expanded={expanded} setExpanded={setExpanded} />);
		const button = screen.getByRole('button');
		userEvent.click(button);
		rerender(<TopbarRightItems expanded={expanded} setExpanded={setExpanded} />);
		userEvent.click(button);
		rerender(<TopbarRightItems expanded={expanded} setExpanded={setExpanded} />);
		expect(expanded).toBeFalsy();
		expect(button).toHaveAttribute('aria-expanded', 'false');
	});
});
