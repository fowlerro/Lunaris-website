import { screen } from '@testing-library/dom';
import renderWithTheme from '@utils/renderWithTheme';
import Illustration from '@views/Main/Illustration';

describe('Hero Illustration component', () => {
	it('should render', () => {
		renderWithTheme(<Illustration />);
		expect(screen.getByRole('img')).toBeInTheDocument();
	});
});
