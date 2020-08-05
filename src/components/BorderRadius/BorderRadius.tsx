/**
 * @file Change the values of border radius in real time
 * @author Matthew Moore
 * @module Bin2Dec
 * @since 2.0.0
 * @version 2.0.0
 */

import React from 'react';
import { Helmet } from '../Helmet/Helmet';
import { Home } from '../Home/Home';
import { JSX, InputChange, ButtonClick } from '../../types/types';
import './borderradius.css';

/**
 * @desc Change the border radius based on the percentages provided in the input
 * @constant
 * @function changeRadius
 * @returns {void}
 * @since 2.0.0
 * @version 2.0.0
 */
const changeRadius = (element: HTMLElement | null): void => {
	const value: string = (element as HTMLInputElement).value.replace(
		/%|\//g,
		''
	);

	const percentages: string[] = value
		.split(' ')
		.filter((char: string) => char.match(/[0-9]/));

	if (percentages.length !== 8)
		(element as HTMLInputElement).style.color = 'red';
	else {
		(element as HTMLInputElement).style.color = 'black';

		const box: HTMLElement | null = document.getElementById('preview');

		let radius: string = percentages.join('% ') + '%';
		radius =
			radius
				.split(' ')
				.slice(0, percentages.length / 2)
				.join(' ') +
			' / ' +
			radius
				.split(' ')
				.slice(percentages.length / 2)
				.join(' ');

		(box as HTMLDivElement).style.borderRadius = radius;
	}
};

/**
 * @desc Copies the text in the input field
 * @constant
 * @function copyText
 * @returns {void}
 * @since 2.0.0
 * @version 2.0.0
 */
const copyText = (element: HTMLElement | null): void => {
	const value: string = (element as HTMLInputElement).value.replace(
		/%|\//g,
		''
	);

	const split: string[] = value
		.split(' ')
		.filter((char: string) => char.match(/[0-9]/));

	const el = document.createElement('textarea');
	el.value =
		'border-radius: ' +
		split.slice(0, split.length / 2).join('% ') +
		' / ' +
		split.slice(split.length / 2).join('% ') +
		'%;';
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.body.removeChild(el);

	(element as HTMLInputElement).textContent = 'Copied!';

	setTimeout(() => {
		(element as HTMLInputElement).textContent = 'Copy';
	}, 1000);

	document.execCommand('copy');
};

/**
 * @desc Change the values of border radius in real time
 * @constant
 * @function BorderRadius
 * @returns {JSX}
 * @since 2.0.0
 * @version 2.0.0
 */
export const BorderRadius = (): JSX => {
	return (
		<div id="borderradius" data-testid="borderradius">
			<Helmet title="Border Radius Previewer" />
			<Home />

			<div id="userInteraction">
				<h1 id="head">Border Radius</h1>
				<input
					type="text"
					id="input"
					data-testid="input"
					placeholder="0% 0% 0% 0% / 0% 0% 0% 0%"
					onChange={(e: InputChange) => changeRadius(e.currentTarget)}
				/>
				<button
					id="copy"
					data-testid="copy"
					onClick={(e: ButtonClick) => copyText(e.currentTarget)}
				>
					Copy
				</button>
			</div>

			<div id="preview"></div>
		</div>
	);
};
