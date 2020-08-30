/**
 * @file Real time calculator
 * @author Matthew Moore
 * @module Calculator
 * @since 4.5.0
 * @version 5.0.0
 */

import React, { useEffect, useState } from 'react';
import {
	ButtonClick,
	JSX,
	StringState,
	BoolState,
	ButtonDown,
} from '../../types/types';
import { Helmet } from '../Helmet/Helmet';
import { Home } from '../Home/Home';
import './calculator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBackspace,
	faEquals,
	faMinus,
	faPlus,
	faTimes,
	faDivide,
} from '@fortawesome/free-solid-svg-icons';

/**
 * @desc For when a number button is clicked or pressed
 * @constant
 * @function valueButton
 * @param {string} input - The current input
 * @param {StringState} setInput - Set the input to a certain value
 * @param {BoolState} setAllClear - Whether AC or C should be displayed
 * @param {number} index - The number to add to the input
 * @param {boolean} mathOp - Whether a mathematical operation is happening
 * @param {BoolState} setMathOp - Set whether a mathematical operation is happening
 * @returns {void}
 * @since 4.0.0
 * @version 4.5.0
 */
const valueButton = (
	input: string,
	setInput: StringState,
	setAllClear: BoolState,
	index: number,
	mathOp: boolean,
	setMathOp: BoolState
): void => {
	setInput(
		mathOp
			? index.toString()
			: input === '0'
			? index.toString()
			: `${input}${index.toString()}`
	);
	setMathOp(false);
	setAllClear(false);
};

/**
 * @desc For when period is clicked or pressed
 * @constant
 * @function valuePeriod
 * @param {string} input - The current input
 * @param {StringState} setInput - Set the input to a certain value
 * @param {BoolState} setAllClear - Whether AC or C should be displayed
 * @param {boolean} mathOp - Whether a mathematical operation is happening
 * @param {BoolState} setMathOp - Set whether a mathematical operation is happening
 * @returns {void}
 * @since 4.0.0
 * @version 4.5.0
 */
const valuePeriod = (
	input: string,
	setInput: StringState,
	setAllClear: BoolState,
	mathOp: boolean,
	setMathOp: BoolState
): void => {
	setInput(
		mathOp || input === '0' ? '.' : input.includes('.') ? input : `${input}.`
	);

	setMathOp(false);

	setAllClear(false);
};

/**
 * @desc For when the equals key is clicked or pressed
 * @constant
 * @function valueEquals
 * @param {string} input - The current input
 * @param {StringState} setInput - Set the input to a certain value
 * @param {string} result - The current result
 * @param {StringState} setResult - Set the result to a certain value
 * @param {boolean} mathCall - Whether a mathematical operation is happening
 * @returns {void}
 * @since 4.0.0
 * @version 4.5.0
 */
const valueEquals = (
	input: string,
	setInput: StringState,
	result: string,
	setResult: StringState,
	mathCall: boolean = false
): void => {
	let leftNumber: number = 0,
		rightNumber: number = 0,
		operation: string = '',
		total: number = Number(input !== '.' ? input : '0'),
		loopIncrement: number = 3;

	const res: string[] = result
		.split(' ')
		.concat([input])
		.filter((val: string) => val !== '' && input !== '.');

	if (!res.includes('=')) {
		for (let i: number = 0; i < res.length - 1; i += loopIncrement) {
			if (i === 0) {
				leftNumber = Number(res[i]);
				operation = res[i + 1];
				rightNumber = Number(res[i + 2]);
			} else {
				leftNumber = total;
				operation = res[i];
				rightNumber = Number(res[i + 1]);
				loopIncrement -= loopIncrement === 3 ? 1 : 0;
			}

			if (operation === '÷') total = leftNumber / rightNumber;
			else if (operation === '×') total = leftNumber * rightNumber;
			else if (operation === '-') total = leftNumber - rightNumber;
			else total = leftNumber + rightNumber;
		}

		setInput(total.toString());

		if (!mathCall && input !== '.') setResult(`${result} ${input} = `);
	}
};

/**
 * @desc For when a mathematical operation key is clicked or pressed
 * @constant
 * @function valueMath
 * @param {string} input - The current input
 * @param {StringState} setInput - Set the input to a certain value
 * @param {string} result - The current result
 * @param {StringState} setResult - Set the result to a certain value
 * @param {BoolState} setAllClear - Whether AC or C should be displayed
 * @param {string} operation - Mathematical operation to do
 * @param {BoolState} setMathOp - Set whether a mathematical operation is happening
 * @returns {void}
 * @since 4.0.0
 * @version 4.5.0
 */
const valueMath = (
	input: string,
	setInput: StringState,
	result: string,
	setResult: StringState,
	setAllClear: BoolState,
	operation: string,
	setMathOp: BoolState
): void => {
	setResult(
		`${result.substring(result.indexOf('=') + 1) + input} ${operation} `
	);

	setMathOp(true);

	valueEquals(
		input.substring(0, input.length),
		setInput,
		result,
		setResult,
		true
	);

	setAllClear(true);
};

/**
 * @desc For when the backspace key is clicked or pressed
 * @constant
 * @function valueBackspace
 * @param {string} input - The current input
 * @param {StringState} setInput - Set the input to a certain value
 * @param {BoolState} setAllClear - Whether AC or C should be displayed
 * @param {boolean} mathOp - Whether a mathematical operation is happening
 * @param {BoolState} setMathOp - Set whether a mathematical operation is happening
 * @returns {void}
 * @since 4.0.0
 * @version 4.5.0
 */
const valueBackspace = (
	input: string,
	setInput: StringState,
	setAllClear: BoolState,
	mathOp: boolean,
	setMathOp: BoolState
): void => {
	setInput(
		mathOp
			? '0'
			: input[0] === '-' && input.length > 2
			? input.substring(0, input.length - 1)
			: input[0] === '-'
			? '0'
			: input.substring(0, input.length - 1).length === 0
			? '0'
			: input.substring(0, input.length - 1)
	);

	setMathOp(false);

	setAllClear(
		input[0] === '-' && input.length > 0
			? input.length - 2 === 0
			: input.length - 1 === 0
	);
};

/**
 * @desc For when a key is pressed
 * @constant
 * @function processKey
 * @param {string} key - The key pressed
 * @param {string} result - The current result
 * @param {StringState} setResult - Set the result to a certain value
 * @param {string} input - The current input
 * @param {StringState} setInput - Set the input to a certain value
 * @param {BoolState} setAllClear - Whether AC or C should be displayed
 * @param {boolean} mathOp - Whether a mathematical operation is happening
 * @param {BoolState} setMathOp - Set whether a mathematical operation is happening
 * @returns {void}
 * @since 4.0.0
 * @version 4.5.0
 */
const processKey = (
	key: string,
	result: string,
	setResult: StringState,
	input: string,
	setInput: StringState,
	setAllClear: BoolState,
	mathOp: boolean,
	setMathOp: BoolState
): void => {
	const allowed: string[] = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'/',
		'-',
		'+',
		'*',
		'.',
		'Backspace',
		'Enter',
	];

	if (allowed.includes(key)) {
		if (key.match(/[0-9]/))
			valueButton(
				input,
				setInput,
				setAllClear,
				Number(allowed.indexOf(key)),
				mathOp,
				setMathOp
			);
		else {
			switch (key) {
				case '.':
					valuePeriod(input, setInput, setAllClear, mathOp, setMathOp);
					break;
				case 'Enter':
					valueEquals(input, setInput, result, setResult);
					break;
				case '+':
					valueMath(
						input,
						setInput,
						result,
						setResult,
						setAllClear,
						'+',
						setMathOp
					);
					break;
				case '-':
					valueMath(
						input,
						setInput,
						result,
						setResult,
						setAllClear,
						'-',
						setMathOp
					);
					break;
				case '*':
					valueMath(
						input,
						setInput,
						result,
						setResult,
						setAllClear,
						'×',
						setMathOp
					);
					break;
				case '/':
					valueMath(
						input,
						setInput,
						result,
						setResult,
						setAllClear,
						'÷',
						setMathOp
					);
					break;
				case 'Backspace':
					valueBackspace(input, setInput, setAllClear, mathOp, setMathOp);
					break;
			}
		}
	}
};

/**
 * @desc Real time calculator
 * @constant
 * @function Calculator
 * @returns {JSX}
 * @since 4.0.0
 * @version 4.5.0
 */
export const Calculator = (): JSX => {
	const [result, setResult] = useState('');
	const [mathOp, setMathOp] = useState(false);
	const [input, setInput] = useState('0');
	const [allClear, setAllClear] = useState(true);

	useEffect(() => {
		document.onkeydown = (e: KeyboardEvent) =>
			processKey(
				e.key,
				result,
				setResult,
				input,
				setInput,
				setAllClear,
				mathOp,
				setMathOp
			);

		return function cleanup() {
			document.onkeydown = null;
		};
	});

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

	return (
		<div id="calculator" data-testid="calculator">
			<Home />
			<Helmet title="Calculator" />
			<div id="calculatorGrid">
				<div
					id="calculatorOutput"
					className="whiteColor operations"
					data-testid="calculatorOutput"
				>
					{result}
				</div>

				<div
					id="calculatorInput"
					className="whiteColor operations"
					data-testid="calculatorInput"
				>
					{input}
				</div>

				<button
					id="clear"
					className="whiteColor topRow"
					data-testid="clear"
					onClick={(e: ButtonClick) => {
						setAllClear(true);
						setInput('0');
						setResult(allClear ? '' : result);
					}}
					onKeyDown={(e: ButtonDown) => {
						if (e.key === 'Enter') {
							e.preventDefault();
						}
					}}
				>
					{allClear ? 'AC' : 'C'}
				</button>
				<button
					id="sign"
					className="whiteColor topRow"
					data-testid="sign"
					onClick={(e: ButtonClick) =>
						setInput(input[0] === '-' ? input.substring(1) : `-${input}`)
					}
					onKeyDown={(e: ButtonDown) => {
						if (e.key === 'Enter') {
							e.preventDefault();
						}
					}}
				>
					+/-
				</button>
				<button
					id="division"
					className="topRow"
					data-testid="division"
					onClick={(e: ButtonClick) =>
						valueMath(
							input,
							setInput,
							result,
							setResult,
							setAllClear,
							'÷',
							setMathOp
						)
					}
					onKeyDown={(e: ButtonDown) => {
						if (e.key === 'Enter') {
							e.preventDefault();
						}
					}}
				>
					<FontAwesomeIcon className="whiteColor topRow" icon={faDivide} />
				</button>
				<button
					id="backspace"
					className="leftSide"
					data-testid="backspace"
					onClick={(e: ButtonClick) =>
						valueBackspace(input, setInput, setAllClear, mathOp, setMathOp)
					}
					onKeyDown={(e: ButtonDown) => {
						if (e.key === 'Enter') {
							e.preventDefault();
						}
					}}
				>
					<FontAwesomeIcon className="whiteColor leftSide" icon={faBackspace} />
				</button>
				<button
					id="mult"
					className="leftSide"
					data-testid="mult"
					onClick={(e: ButtonClick) =>
						valueMath(
							input,
							setInput,
							result,
							setResult,
							setAllClear,
							'×',
							setMathOp
						)
					}
					onKeyDown={(e: ButtonDown) => {
						if (e.key === 'Enter') {
							e.preventDefault();
						}
					}}
				>
					<FontAwesomeIcon className="whiteColor leftSide" icon={faTimes} />
				</button>
				<button
					id="minus"
					className="leftSide"
					data-testid="minus"
					onClick={(e: ButtonClick) =>
						valueMath(
							input,
							setInput,
							result,
							setResult,
							setAllClear,
							'-',
							setMathOp
						)
					}
					onKeyDown={(e: ButtonDown) => {
						if (e.key === 'Enter') {
							e.preventDefault();
						}
					}}
				>
					<FontAwesomeIcon className="whiteColor leftSide" icon={faMinus} />
				</button>
				<button
					id="plus"
					className="leftSide"
					data-testid="plus"
					onClick={(e: ButtonClick) =>
						valueMath(
							input,
							setInput,
							result,
							setResult,
							setAllClear,
							'+',
							setMathOp
						)
					}
					onKeyDown={(e: ButtonDown) => {
						if (e.key === 'Enter') {
							e.preventDefault();
						}
					}}
				>
					<FontAwesomeIcon className="whiteColor leftSide" icon={faPlus} />
				</button>
				<button
					id="equals"
					className="leftSide"
					data-testid="equals"
					onClick={(e: ButtonClick) =>
						valueEquals(input, setInput, result, setResult)
					}
					onKeyDown={(e: ButtonDown) => {
						if (e.key === 'Enter') {
							e.preventDefault();
						}
					}}
				>
					<FontAwesomeIcon className="whiteColor leftSide" icon={faEquals} />
				</button>
				<button
					id="period"
					className="whiteColor numberPeriod"
					data-testid="period"
					onClick={(e: ButtonClick) =>
						valuePeriod(input, setInput, setAllClear, mathOp, setMathOp)
					}
					onKeyDown={(e: ButtonDown) => {
						if (e.key === 'Enter') {
							e.preventDefault();
						}
					}}
				>
					.
				</button>
				{Array.from({ length: 10 }, (v: undefined, i: number) => i).map(
					(value: number, index: number) => (
						<button
							id={nums[index]}
							className="whiteColor numberPeriod"
							data-testid={nums[index]}
							key={index}
							onClick={(e: ButtonClick) =>
								valueButton(
									input,
									setInput,
									setAllClear,
									index,
									mathOp,
									setMathOp
								)
							}
							onKeyDown={(e: ButtonDown) => {
								if (e.key === 'Enter') {
									e.preventDefault();
								}
							}}
						>
							{index}
						</button>
					)
				)}
			</div>
		</div>
	);
};
