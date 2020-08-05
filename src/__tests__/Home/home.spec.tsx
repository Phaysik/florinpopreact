import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Home } from '../../components/Home/Home';

beforeEach(cleanup);

describe('<Home />', () => {
	it('Renders the component', () => {
		const { queryByTestId } = render(<Home />);

		expect(queryByTestId('home')).toBeTruthy();
	});
});
