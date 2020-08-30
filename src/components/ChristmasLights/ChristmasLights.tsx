/**
 * @file Christmas Lights
 * @author Matthew Moore
 * @module ChristmasLights
 * @since 5.0.0
 * @version 5.0.0
 */

import React, { useEffect, useState } from 'react';
import { JSX, InputChange, ButtonClick } from '../../types/types';
import { Helmet } from '../Helmet/Helmet';
import { Home } from '../Home/Home';
import './christmaslights.css';

/**
 * @desc Change the background color of the input element
 * @constant
 * @function updateElement
 * @param {InputChange} event - The event which was fired
 * @param {string} id - The id of the element to change
 * @returns {void}
 * @since 5.0.0
 * @version 5.0.0
 */
const updateElement = (event: InputChange, id: string): void => {
	const button: HTMLElement | null = document.getElementById(id);

	if (button) {
		button.style.backgroundColor = event.target.value;
	}
};

/**
 * @desc Convert rgb to hex
 * @constant
 * @function rgbToHex
 * @param {number} red - The red value
 * @param {number} green - The green value
 * @param {number} blue - The blue value
 * @returns {string}
 * @since 5.0.0
 * @version 5.0.0
 */
const rgbToHex = (red: number, green: number, blue: number): string => {
	interface HexDictionary {
		[key: number]: number | string;
	}

	const hexVals: HexDictionary = {
		0: 0,
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9,
		10: 'A',
		11: 'B',
		12: 'C',
		13: 'D',
		14: 'E',
		15: 'F',
	};

	const a: number | string = hexVals[Math.floor(red / 16)];
	const b: number | string = hexVals[red % 16];
	const c: number | string = hexVals[Math.floor(green / 16)];
	const d: number | string = hexVals[green % 16];
	const e: number | string = hexVals[Math.floor(blue / 16)];
	const f: number | string = hexVals[blue % 16];
	return `#${a}${b}${c}${d}${e}${f}`;
};

/**
 * @desc Start the interval timers
 * @constant
 * @function startTimer
 * @param {number} intensity - The intensity of the of the pixels
 * @param {number} time - The interval of time to do the lighting
 * @returns {number}
 * @since 5.0.0
 * @version 5.0.0
 */
const startTimer = (intensity: number, time: number): number => {
	const inputs: NodeListOf<Element> = document.querySelectorAll(
		'.lights input'
	);

	return window.setInterval(() => {
		for (let i: number = 0; i < inputs.length; i++) {
			const style: string | null = inputs[i].getAttribute('style');
			let color: string = '#424141';

			if (inputs[i].className.includes('on')) {
				inputs[i].className = 'off';
			} else {
				inputs[i].className = 'on';

				if (style) {
					const split: string[] = style.split(' ');
					const red: number = Number(
						split[1].substring(4, split[1].length - 1)
					);
					const green: number = Number(
						split[2].substring(0, split[2].length - 1)
					);
					const blue: number = Number(
						split[3].substring(0, split[3].length - 2)
					);
					const max: number = Math.max(red, green, blue);

					color = rgbToHex(
						max === red ? (red - intensity > 0 ? red - intensity : 0) : red,
						max === green
							? green - intensity > 0
								? green - intensity
								: 0
							: green,
						max === blue ? (blue - intensity > 0 ? blue - intensity : 0) : blue
					);
				}
				inputs[i].animate(
					[
						// keyframes
						{ boxShadow: 'none' },
						{ boxShadow: `0px 0px 10px 8px ${color}` },
						{ boxShadow: 'none' },
					],
					{
						// timing options
						duration: time * 1000,
						iterations: 1,
					}
				);
			}
		}
	}, time * 1000);
};

/**
 * @desc Add rows of lights based on the param rows
 * @constant
 * @function addLights
 * @param {number} rows - The amount of light rows to add
 * @returns {JSX[]}
 * @since 5.0.0
 * @version 5.0.0
 */
const addLights = (rows: number): JSX[] => {
	let lightRows: JSX[] = [];

	for (let i: number = 0; i < rows; i++) {
		let elem: JSX = (
			<div className="lights" key={i}>
				{Array.from({ length: 7 }, (v: unknown, i: number) => i).map(
					(num: number) => (
						<div className="lightClick" key={num}>
							<div className={num !== 6 ? 'box lighttop' : 'box'}></div>
							<input
								type="color"
								id={(num + 7 * i).toString()}
								className={!(num % 2) ? 'on' : 'off'}
								onChange={(e: InputChange) =>
									updateElement(e, (num + 7 * i).toString())
								}
							></input>
						</div>
					)
				)}
			</div>
		);

		lightRows.push(elem);
	}

	return lightRows;
};

/**
 * @desc Christmas Lights
 * @constant
 * @function ChristmasLights
 * @returns {JSX}
 * @since 5.0.0
 * @version 5.0.0
 */
export const ChristmasLights = (): JSX => {
	const [stopInter, setStopInter] = useState(0);
	const [intensity, setIntensity] = useState(0);
	const [time, setTime] = useState(1);
	const [rows, setRows] = useState(1);
	const [lights, setLights] = useState([] as JSX.Element[]);

	useEffect(() => {
		setLights(addLights(rows));

		return () => clearInterval(stopInter);
	}, [rows, stopInter]);

	return (
		<div id="christmaslights" data-testid="christmaslights">
			<Helmet title="Christmas Lights" />
			<Home />

			{lights}

			<div id="lightManip">
				<button
					id="start"
					data-testid="start"
					onClick={(e: ButtonClick) =>
						setStopInter(startTimer(intensity, time))
					}
				>
					Start
				</button>

				<button
					id="end"
					data-testid="end"
					onClick={(e: ButtonClick) => clearInterval(stopInter)}
				>
					Stop
				</button>

				<button
					id="addRows"
					data-testid="addRows"
					onClick={(e: ButtonClick) => setRows(rows + 1)}
				>
					Add Rows
				</button>

				<button
					id="removeRows"
					data-testid="removeRows"
					onClick={(e: ButtonClick) => setRows(rows - 1)}
				>
					Remove Rows
				</button>

				<input
					type="text"
					placeholder="Enter an intensity value"
					id="intensity"
					data-testid="intensity"
					onChange={(e: InputChange) => {
						const inten: string = e.target.value.replace(/[^0-9]/gi, '');

						(document.getElementById(
							'intensity'
						) as HTMLInputElement).value = inten;

						setIntensity(Number(inten) | 0);
					}}
				/>

				<input
					type="text"
					placeholder="Enter a time interval"
					id="timeInterval"
					data-testid="timeInterval"
					onChange={(e: InputChange) => {
						const inten: string = e.target.value.replace(/[^0-9]/gi, '');

						(document.getElementById(
							'timeInterval'
						) as HTMLInputElement).value = inten;

						setTime(Number(inten) | 1);
					}}
				/>
			</div>
		</div>
	);
};
