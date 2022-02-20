import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import TopbarRightItems from '@components/Topbar/Desktop/TopbarRightItems';

describe('Desktop Topbar RightItems component', () => {
	it('should render', () => {
		render(<TopbarRightItems />);
		expect(screen.getByRole('navigation', { name: 'Action buttons' })).toBeInTheDocument();
	});

	it('should render LanguageSwitcher', () => {
		render(<TopbarRightItems />);
		expect(screen.getByRole('switch', { name: 'Language switcher' })).toBeInTheDocument();
	});

	it('should render Notifications Icon', () => {
		render(<TopbarRightItems />);
		expect(screen.getByRole('listitem', { name: 'Notifications' })).toBeInTheDocument();
	});

	it('should render Login button', () => {
		render(<TopbarRightItems />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
});
