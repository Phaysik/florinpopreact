import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Home } from '../../components/Home/Home';
import { BrowserRouter as Router } from 'react-router-dom';

beforeEach(cleanup);

describe('<Home />', () => {
	it('Renders the component', () => {
		const { queryByTestId } = render(
			<Router>
				<Home />
			</Router>
		);

		expect(queryByTestId('home')).toBeTruthy();
	});
});
