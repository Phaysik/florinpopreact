/**
 * @file The Router for all the projects
 * @author Matthew Moore
 * @module Router
 * @since 1.0.0
 * @version 2.0.0
 */

import React from 'react';
import { BrowserRouter as Routes, Switch, Route } from 'react-router-dom';
import { Bin2Dec } from '../Bin2Dec/Bin2Dec';
import { BorderRadius } from '../BorderRadius/BorderRadius';
import { JSX } from '../../types/types';

/**
 * @desc The Router for all the projects
 * @constant
 * @function Router
 * @returns {JSX}
 * @since 1.0.0
 * @version 2.0.0
 */
export const Router = (): JSX => {
	return (
		<Routes>
			<Switch>
				<Route exact path="/">
					<h1>Home</h1>
				</Route>

				<Route path="/bin2dec">
					<Bin2Dec />
				</Route>

				<Route path="/borderradius">
					<BorderRadius />
				</Route>
			</Switch>
		</Routes>
	);
};
