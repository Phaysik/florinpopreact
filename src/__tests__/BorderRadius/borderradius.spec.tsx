import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BorderRadius } from '../../components/BorderRadius/BorderRadius';
import { BrowserRouter as Router } from 'react-router-dom';

beforeEach(cleanup);

jest.useFakeTimers();

document.execCommand = jest.fn();

describe('<BorderRadius />', () => {
	it('Renders the component', () => {
		const { queryByTestId } = render(
			<Router>
				<BorderRadius />
			</Router>
		);

		expect(queryByTestId('borderradius')).toBeTruthy();
	});

	it('Input OnChange Event', () => {
		const { queryByTestId } = render(
			<Router>
				<BorderRadius />
			</Router>
		);

		expect(queryByTestId('borderradius')).toBeTruthy();

		const input: HTMLElement | null = queryByTestId('input');

		if (input) {
			fireEvent.change(input, {
				target: { value: '2 2 2 2% / 2% 2 2 2' },
			});

			expect((input as HTMLInputElement).value).toBe('2 2 2 2% / 2% 2 2 2');
		}
	});

	it('Input OnChange Event with less than eight vals', () => {
		const { queryByTestId } = render(
			<Router>
				<BorderRadius />
			</Router>
		);

		expect(queryByTestId('borderradius')).toBeTruthy();

		const input: HTMLElement | null = queryByTestId('input');

		if (input) {
			fireEvent.change(input, {
				target: { value: '2 2 2 2% / 2% 2 ' },
			});

			expect((input as HTMLInputElement).style.color).toBe('red');
		}
	});

	it('Copy onClick Event', () => {
		const { queryByTestId } = render(
			<Router>
				<BorderRadius />
			</Router>
		);

		expect(queryByTestId('borderradius')).toBeTruthy();

		let copy: HTMLElement | null = queryByTestId('copy');

		if (copy) {
			fireEvent.click(copy);

			jest.runAllTimers();

			expect(setTimeout).toHaveBeenCalledTimes(1);
			expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
		}
	});
});
