import Hamburger from '@components/layout/Topbar/Hamburger';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithTheme from '@utils/renderWithTheme';
import { Dispatch, SetStateAction } from 'react';

describe('Topbar Hamburger component', () => {
	let expanded = false;
	const setExpanded: Dispatch<SetStateAction<boolean>> = (value: SetStateAction<boolean>) => {
		expanded = !!value;
	};
	it('should render', () => {
		renderWithTheme(<Hamburger expanded={expanded} setExpanded={setExpanded} />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('should switch expanded after click', () => {
		const { rerender } = renderWithTheme(<Hamburger expanded={expanded} setExpanded={setExpanded} />);
		const button = screen.getByRole('button');
		userEvent.click(button);
		rerender(<Hamburger expanded={expanded} setExpanded={setExpanded} />);
		expect(expanded).toBeTruthy();
		userEvent.click(button);
		expect(expanded).toBeFalsy();
	});
});
