import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import MenuItems from '@components/Topbar/MenuItems';

describe('Topbar MenuItems component', () => {
	it('should render', () => {
		render(<MenuItems />);
		const links = screen.getAllByRole('link');
		expect(links).toBeDefined();
	});
});
