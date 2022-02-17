import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Illustration from '@views/Main/Illustration';

describe('Main Page Header Illustration', () => {
	it('should renders', () => {
		render(<Illustration />);
		expect(screen.getByRole('img')).toBeInTheDocument();
	});
});
