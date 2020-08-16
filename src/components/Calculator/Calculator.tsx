/**
 * @file Real time calculator
 * @author Matthew Moore
 * @module Calculator
 * @since 4.0.0
 * @version 4.0.0
 */

// TODO Test the project you monkey

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
 * @returns {void}
 * @since 4.0.0
 * @version 4.0.0
 */
const valueButton = (
	input: string,
	setInput: StringState,
	setAllClear: BoolState,
	index: number
): void => {
	setInput(`${input}${index.toString()}`);
	setAllClear(false);
};

/**
 * @desc For when period is clicked or pressed
 * @constant
 * @function valuePeriod
 * @param {string} input - The current input
 * @param {StringState} setInput - Set the input to a certain value
 * @param {BoolState} setAllClear - Whether AC or C should be displayed
 * @returns {void}
 * @since 4.0.0
 * @version 4.0.0
 */
const valuePeriod = (
	input: string,
	setInput: StringState,
	setAllClear: BoolState
): void => {
	setInput(input.includes('.') ? input : `${input}.`);
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
 * @returns {void}
 * @since 4.0.0
 * @version 4.0.0
 */
const valueEquals = (
	input: string,
	setInput: StringState,
	result: string,
	setResult: StringState
): void => {
	let leftNumber: number = Number(result.split(' ')[0]),
		rightNumber: number = Number(input);

	if (result.includes('÷')) {
		setInput((leftNumber / rightNumber).toString());
	} else if (result.includes('×')) {
		setInput((leftNumber * rightNumber).toString());
	} else if (result.includes('-') && result[0] !== '-') {
		setInput((leftNumber - rightNumber).toString());
	} else if (result.includes('+')) {
		setInput((leftNumber + rightNumber).toString());
	}

	setResult(`${result} ${input} = `);
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
 * @returns {void}
 * @since 4.0.0
 * @version 4.0.0
 */
const valueMath = (
	input: string,
	setInput: StringState,
	result: string,
	setResult: StringState,
	setAllClear: BoolState,
	operation: string
): void => {
	if (input.length > 0) {
		setResult(`${input} ${operation} `);
	} else {
		setResult(`${result.split(' ')[0]} ${operation} `);
	}

	setInput('');
	setAllClear(true);
};

/**
 * @desc For when the backspace key is clicked or pressed
 * @constant
 * @function valueBackspace
 * @param {string} input - The current input
 * @param {StringState} setInput - Set the input to a certain value
 * @param {BoolState} setAllClear - Whether AC or C should be displayed
 * @returns {void}
 * @since 4.0.0
 * @version 4.0.0
 */
const valueBackspace = (
	input: string,
	setInput: StringState,
	setAllClear: BoolState
): void => {
	setInput(
		input[0] === '-' && input.length > 2
			? input.substring(0, input.length - 1)
			: input[0] === '-'
			? ''
			: input.substring(0, input.length - 1)
	);
	setAllClear(
		input[0] === '-' && input.length > 0
			? input.length - 2 === 0
			: input.length > 0
			? input.length - 1 === 0
			: input.length === 0
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
 * @param {string} allClear - If AC or C is displayed
 * @param {BoolState} setAllClear - Whether AC or C should be displayed
 * @returns {void}
 * @since 4.0.0
 * @version 4.0.0
 */
const processKey = (
	key: string,
	result: string,
	setResult: StringState,
	input: string,
	setInput: StringState,
	allClear: boolean,
	setAllClear: BoolState
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
			valueButton(input, setInput, setAllClear, Number(allowed.indexOf(key)));
		else {
			switch (key) {
				case '.':
					valuePeriod(input, setInput, setAllClear);
					break;
				case 'Enter':
					valueEquals(input, setInput, result, setResult);
					break;
				case '+':
					valueMath(input, setInput, result, setResult, setAllClear, '+');
					break;
				case '-':
					valueMath(input, setInput, result, setResult, setAllClear, '-');
					break;
				case '*':
					valueMath(input, setInput, result, setResult, setAllClear, '×');
					break;
				case '/':
					valueMath(input, setInput, result, setResult, setAllClear, '÷');
					break;
				case 'Backspace':
					valueBackspace(input, setInput, setAllClear);
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
 * @version 4.0.0
 */
export const Calculator = (): JSX => {
	const [result, setResult] = useState('');
	const [input, setInput] = useState('');
	const [allClear, setAllClear] = useState(true);

	useEffect(() => {
		document.onkeydown = (e: KeyboardEvent) =>
			processKey(
				e.key,
				result,
				setResult,
				input,
				setInput,
				allClear,
				setAllClear
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
				<div id="calculatorInput" className="whiteColor operations">
					{input}
				</div>

				<div id="calculatorOutput" className="whiteColor operations">
					{result}
				</div>

				<button
					id="clear"
					className="whiteColor topRow"
					onClick={(e: ButtonClick) => {
						setAllClear(true);
						setInput('');
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
					onClick={(e: ButtonClick) =>
						valueMath(input, setInput, result, setResult, setAllClear, '÷')
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
					onClick={(e: ButtonClick) =>
						valueBackspace(input, setInput, setAllClear)
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
					onClick={(e: ButtonClick) =>
						valueMath(input, setInput, result, setResult, setAllClear, '×')
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
					onClick={(e: ButtonClick) =>
						valueMath(input, setInput, result, setResult, setAllClear, '-')
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
					onClick={(e: ButtonClick) =>
						valueMath(input, setInput, result, setResult, setAllClear, '+')
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
					onClick={(e: ButtonClick) =>
						valuePeriod(input, setInput, setAllClear)
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
							className="whiteColor numberPeriod"
							key={index}
							id={nums[index]}
							onClick={(e: ButtonClick) =>
								valueButton(input, setInput, setAllClear, index)
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
