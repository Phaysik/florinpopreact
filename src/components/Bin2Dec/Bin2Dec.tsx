/**
 * @file Convert binary to decimal
 * @author Matthew Moore
 * @module Bin2Dec
 * @since 1.0.0
 * @version 1.0.0
 */

import React from 'react';
import { Helmet } from '../Helmet/Helmet';
import { Home } from '../Home/Home';
import { JSX, InputEvent } from '../../types/types';
import './bin2dec.css';

/**
 * @desc Convert the binary to decimal if possible
 * @constant
 * @function convert
 * @param {string} line - The line to process
 * @returns {string}
 * @since 1.0.0
 * @version 1.0.0
 */
const convert = (line: string): string => {
	let result: number = 0,
		power: number = 0;

	if (!line.split('').every((char: string) => char === '0' || char === '1'))
		return 'Invalid binary';

	let lineNumber: number = Number(line);

	while (lineNumber !== 0) {
		const currSplit: number = lineNumber % 10;
		lineNumber -= currSplit;
		lineNumber /= 10;
		if (currSplit === 1) {
			result += 2 ** power;
		}
		power++;
	}
	return result.toString();
};

/**
 * @desc Process the input and display the result
 * @constant
 * @function processInput
 * @returns {void}
 * @since 1.0.0
 * @version 1.0.0
 */
const processInput = (input: string): void => {
	const result: HTMLElement | null = document.getElementById('res');

	input += '\n';

	if (result) {
		let decimalVals: string = '',
			holdVals: string = '';
		for (let i: number = 0; i < input.length; i++) {
			if (input[i] === '\n' && holdVals !== '') {
				decimalVals += `${convert(holdVals)}\n`;
				holdVals = '';
			} else holdVals += input[i];
		}

		result.textContent = decimalVals.substring(0, decimalVals.length - 1);
	}
};

/**
 * @desc The Component to convert binary to decimal
 * @constant
 * @function Bin2Dec
 * @returns {JSX}
 * @since 1.0.0
 * @version 1.0.0
 */
export const Bin2Dec = (): JSX => {
	return (
		<div id="bin2dec" data-testid="bin2dec">
			<Helmet title="Bin2Dec" />
			<Home />

			<div id="userinput">
				<h1 className="title">Binary Input</h1>
				<textarea
					id="input"
					data-testid="userinput"
					onChange={(e: InputEvent) => processInput(e.target.value)}
				></textarea>
			</div>

			<div id="result">
				<h1 className="title">Decimal Output</h1>
				<textarea id="res" data-testid="result" readOnly></textarea>
			</div>
		</div>
	);
};
