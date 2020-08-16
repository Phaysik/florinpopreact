import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Calculator } from '../../components/Calculator/Calculator';
import { BrowserRouter as Router } from 'react-router-dom';

beforeEach(cleanup);

describe('<Calculator />', () => {
	it('Renders the component', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();
	});

	it('Deals with document.onkeydown with numerical value', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();

		fireEvent.keyDown(document, { key: '8', code: 'Key8' });

		expect(queryByTestId('calculatorInput')?.textContent).toBe('8');
	});

	it('Deals with document.onkeydown with mathematical values', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();

		fireEvent.keyDown(document, { key: '8', code: 'Key8' });
		fireEvent.keyDown(document, { key: '+', code: 'Key+' });
		fireEvent.keyDown(document, { key: '6', code: 'Key6' });
		fireEvent.keyDown(document, { key: '-', code: 'Key-' });
		fireEvent.keyDown(document, { key: '3', code: 'Key3' });
		fireEvent.keyDown(document, { key: '.', code: 'Key.' });
		fireEvent.keyDown(document, { key: '.', code: 'Key.' });
		fireEvent.keyDown(document, { key: '2', code: 'Key2' });
		fireEvent.keyDown(document, { key: '*', code: 'Key*' });
		fireEvent.keyDown(document, { key: '4', code: 'Key4' });
		fireEvent.keyDown(document, { key: '/', code: 'Key/' });
		fireEvent.keyDown(document, { key: '6', code: 'Key6' });
		fireEvent.keyDown(document, { key: '3', code: 'Key3' });
		fireEvent.keyDown(document, { key: 'Backspace', code: 'KeyBackspace' });
		fireEvent.keyDown(document, { key: '-', code: 'Key-' });
		fireEvent.keyDown(document, { key: 'Backspace', code: 'KeyBackspace' });
		fireEvent.keyDown(document, { key: '7', code: 'Key7' });
		fireEvent.keyDown(document, { key: '.', code: 'Key.' });
		fireEvent.keyDown(document, { key: '2', code: 'Key2' });
		fireEvent.keyDown(document, { key: 'Enter', code: 'KeyEnter' });
		fireEvent.keyDown(document, { key: '.', code: 'Key.' });
		fireEvent.keyDown(document, { key: 'Enter', code: 'KeyEnter' });
		fireEvent.keyDown(document, { key: 'Enter', code: 'KeyEnter' });

		expect(queryByTestId('calculatorInput')?.textContent).toBe('0');
	});

	it('Deals with document.onkeydown with invalid response', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();

		fireEvent.keyDown(document, { key: 'a', code: 'Keya' });

		expect(queryByTestId('calculatorInput')?.textContent).toBe('0');
	});

	it('Clear Button OnClick', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();

		const clear: HTMLElement | null = queryByTestId('clear');

		if (clear) {
			fireEvent.click(clear);
			expect(clear.textContent).toBe('AC');

			fireEvent.keyDown(document, { key: '8', code: 'Key8' });
			fireEvent.keyDown(document, { key: '+', code: 'Key+' });
			fireEvent.keyDown(document, { key: '6', code: 'Key6' });

			expect(clear.textContent).toBe('C');

			fireEvent.click(clear);
			expect(clear.textContent).toBe('AC');

			fireEvent.click(clear);
			expect(clear.textContent).toBe('AC');
		}
	});

	it('Clear Button KeyDown', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();

		const clear: HTMLElement | null = queryByTestId('clear');

		if (clear) {
			fireEvent.keyDown(document, { key: '8', code: 'Key8' });
			fireEvent.keyDown(clear, { key: 'Enter', code: 'KeyEnter' });
			fireEvent.keyDown(clear, { key: '1', code: 'Key1' });
			expect(clear.textContent).toBe('C');
			expect(queryByTestId('calculatorInput')?.textContent).toBe('81');
		}
	});

	it('Sign Button OnClick', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();

		const sign: HTMLElement | null = queryByTestId('sign');

		if (sign) {
			fireEvent.click(sign);
			expect(queryByTestId('calculatorInput')?.textContent).toBe('-0');

			fireEvent.click(sign);
			expect(queryByTestId('calculatorInput')?.textContent).toBe('0');
		}
	});

	it('Sign Button KeyDown', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();

		const sign: HTMLElement | null = queryByTestId('sign');

		if (sign) {
			fireEvent.click(sign);
			fireEvent.keyDown(document, { key: '8', code: 'Key8' });
			fireEvent.keyDown(sign, { key: 'Enter', code: 'KeyEnter' });
			fireEvent.keyDown(sign, { key: '1', code: 'Key1' });
			expect(queryByTestId('calculatorInput')?.textContent).toBe('-81');
		}
	});

	it('Division Button OnClick and KeyDown', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();

		const division: HTMLElement | null = queryByTestId('division');

		if (division) {
			fireEvent.keyDown(document, { key: '8', code: 'Key8' });
			fireEvent.keyDown(division, { key: 'Enter', code: 'KeyEnter' });
			fireEvent.keyDown(division, { key: '1', code: 'Key1' });
			fireEvent.click(division);
			fireEvent.keyDown(document, { key: '3', code: 'Key3' });
			fireEvent.keyDown(division, { key: 'Enter', code: 'KeyEnter' });

			expect(queryByTestId('calculatorInput')?.textContent).toBe('27');
		}
	});

	it('Multiply Button OnClick and KeyDown', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();

		const mult: HTMLElement | null = queryByTestId('mult');

		if (mult) {
			fireEvent.keyDown(document, { key: '8', code: 'Key8' });
			fireEvent.keyDown(mult, { key: 'Enter', code: 'KeyEnter' });
			fireEvent.keyDown(mult, { key: '1', code: 'Key1' });
			fireEvent.click(mult);
			fireEvent.keyDown(document, { key: '3', code: 'Key3' });
			fireEvent.keyDown(mult, { key: 'Enter', code: 'KeyEnter' });

			expect(queryByTestId('calculatorInput')?.textContent).toBe('243');
		}
	});

	it('Addition Button OnClick and KeyDown', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();

		const plus: HTMLElement | null = queryByTestId('plus');

		if (plus) {
			fireEvent.keyDown(document, { key: '8', code: 'Key8' });
			fireEvent.keyDown(plus, { key: 'Enter', code: 'KeyEnter' });
			fireEvent.keyDown(plus, { key: '1', code: 'Key1' });
			fireEvent.click(plus);
			fireEvent.keyDown(document, { key: '3', code: 'Key3' });
			fireEvent.keyDown(plus, { key: 'Enter', code: 'KeyEnter' });

			expect(queryByTestId('calculatorInput')?.textContent).toBe('84');
		}
	});

	it('Subtraction Button OnClick and KeyDown', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();

		const minus: HTMLElement | null = queryByTestId('minus');

		if (minus) {
			fireEvent.keyDown(document, { key: '8', code: 'Key8' });
			fireEvent.keyDown(minus, { key: 'Enter', code: 'KeyEnter' });
			fireEvent.keyDown(minus, { key: '1', code: 'Key1' });
			fireEvent.click(minus);
			fireEvent.keyDown(document, { key: '3', code: 'Key3' });
			fireEvent.keyDown(minus, { key: 'Enter', code: 'KeyEnter' });

			expect(queryByTestId('calculatorInput')?.textContent).toBe('78');
		}
	});

	it('Equals Button OnClick and KeyDown', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();

		const equals: HTMLElement | null = queryByTestId('equals');

		if (equals) {
			fireEvent.keyDown(document, { key: '8', code: 'Key8' });
			fireEvent.keyDown(equals, { key: 'Enter', code: 'KeyEnter' });
			fireEvent.keyDown(equals, { key: '1', code: 'Key1' });
			fireEvent.click(equals);

			expect(queryByTestId('calculatorInput')?.textContent).toBe('81');
		}
	});

	it('Period Button OnClick and KeyDown', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();

		const period: HTMLElement | null = queryByTestId('period');

		if (period) {
			fireEvent.keyDown(document, { key: '8', code: 'Key8' });
			fireEvent.keyDown(period, { key: 'Enter', code: 'KeyEnter' });
			fireEvent.keyDown(period, { key: '1', code: 'Key1' });
			fireEvent.click(period);

			expect(queryByTestId('calculatorInput')?.textContent).toBe('81.');
		}
	});

	it('Backspace Button OnClick and KeyDown', () => {
		const { queryByTestId } = render(
			<Router>
				<Calculator />
			</Router>
		);

		expect(queryByTestId('calculator')).toBeTruthy();

		const backspace: HTMLElement | null = queryByTestId('backspace');
		const sign: HTMLElement | null = queryByTestId('sign');

		if (backspace && sign) {
			fireEvent.keyDown(document, { key: '8', code: 'Key8' });
			fireEvent.keyDown(backspace, { key: 'Enter', code: 'KeyEnter' });
			fireEvent.keyDown(backspace, { key: '1', code: 'Key1' });
			fireEvent.click(sign);
			fireEvent.click(backspace);
			fireEvent.click(backspace);
			fireEvent.keyDown(backspace, { key: '1', code: 'Key1' });
			fireEvent.click(backspace);

			expect(queryByTestId('calculatorInput')?.textContent).toBe('0');
		}
	});

	for (let i: number = 0; i < 10; i++) {
		it(`Number${i} Button OnClick and KeyDown`, () => {
			const { queryByTestId } = render(
				<Router>
					<Calculator />
				</Router>
			);

			expect(queryByTestId('calculator')).toBeTruthy();

			interface Dictionary {
				[key: number]: string;
			}

			const nums: Dictionary = {
				0: 'zero',
				1: 'one',
				2: 'two',
				3: 'three',
				4: 'four',
				5: 'five',
				6: 'six',
				7: 'seven',
				8: 'eight',
				9: 'nine',
			};

			const number: HTMLElement | null = queryByTestId(`${nums[i]}`);

			if (number) {
				fireEvent.click(number);
				expect(queryByTestId('calculatorInput')?.textContent).toBe(
					i.toString()
				);

				fireEvent.keyDown(number, { key: 'Enter', code: 'KeyEnter' });
				fireEvent.keyDown(number, { key: 'A', code: 'KeyA' });

				expect(queryByTestId('calculatorInput')?.textContent).toBe(
					i.toString()
				);
			}
		});
	}
});
