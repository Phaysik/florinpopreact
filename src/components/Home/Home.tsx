/**
 * @file Display a button to route back to home
 * @author Matthew Moore
 * @module Home
 * @since 1.0.0
 * @version 1.0.0
 */

import React from 'react';
import { JSX } from '../../types/types';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import './home.css';

/**
 * @desc React component to route back to home
 * @constant
 * @function Home
 * @returns {JSX}
 * @since 1.0.0
 * @version 1.0.0
 */
export const Home = (): JSX => {
	return (
		<nav id="home" data-testid="home">
			<Router>
				<NavLink activeClassName="link" to="/">
					Home
				</NavLink>
			</Router>
		</nav>
	);
};
