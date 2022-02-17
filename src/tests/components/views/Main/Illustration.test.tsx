import { render } from '@testing-library/react';
import Illustration from '@views/Main/Illustration';

describe('Main Page Header Illustration', () => {
	it('should renders', () => {
		const res = render(<Illustration />);
		expect(res.getByRole('img')).toBeTruthy();
	});
});
