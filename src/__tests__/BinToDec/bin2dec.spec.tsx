import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Bin2Dec } from '../../components/Bin2Dec/Bin2Dec';

beforeEach(cleanup);

describe('<Bin2Dec />', () => {
	it('Renders the application', () => {
		const { queryByTestId } = render(<Bin2Dec />);

		expect(queryByTestId('bin2dec')).toBeTruthy();
	});

	it('UserInput OnChange Event', () => {
		const { queryByTestId } = render(<Bin2Dec />);

		expect(queryByTestId('bin2dec')).toBeTruthy();

		const userInput: HTMLElement | null = queryByTestId('userinput');

		if (userInput) {
			fireEvent.change(userInput, {
				target: { textContent: '100101\n110001' },
			});

			expect(userInput.textContent).toBe('100101\n110001');
		}
	});

	it('Check Result has appropriate values', () => {
		const { queryByTestId } = render(<Bin2Dec />);

		expect(queryByTestId('bin2dec')).toBeTruthy();

		const userInput: HTMLElement | null = queryByTestId('userinput');
		const result: HTMLElement | null = queryByTestId('result');

		if (userInput && result) {
			fireEvent.change(userInput, {
				target: { textContent: '100101\n110001\n0111011\n20001\n' },
			});

			expect(userInput.textContent).toBe('100101\n110001\n0111011\n20001\n');
			expect(result.textContent).toBe('37\n49\n59\nInvalid binary');
		}
	});

	it('Check if result exists', () => {
		const { queryByTestId } = render(<Bin2Dec />);

		expect(queryByTestId('bin2dec')).toBeTruthy();

		const userInput: HTMLElement | null = queryByTestId('userinput');
		let result: HTMLElement | null = queryByTestId('result');

		if (userInput && result) {
			result.remove();

			fireEvent.change(userInput, {
				target: { textContent: '100101\n110001\n0111011\n20001\n' },
			});

			expect(document.getElementById('res')).toBeFalsy();
		}
	});
});
