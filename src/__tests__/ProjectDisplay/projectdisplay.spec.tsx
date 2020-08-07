import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ProjectDisplay } from '../../components/ProjectDisplay/ProjectDisplay';
import { BrowserRouter as Router } from 'react-router-dom';

beforeEach(cleanup);

describe('<ProjectDisplay />', () => {
	it('Renders the component', () => {
		const { queryByTestId } = render(
			<Router>
				<ProjectDisplay />
			</Router>
		);

		expect(queryByTestId('projectDisplay')).toBeTruthy();
	});
});
