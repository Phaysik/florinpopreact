/**
 * @file Change title of the page
 * @author Matthew Moore
 * @module Helmet
 * @since 1.0.0
 * @version 1.0.0
 */

import React from 'react';
import { Helmet as TitleSwitcher } from 'react-helmet';
import { JSX } from '../../types/types';

/**
 * @desc React component to change the title of the page
 * @constant
 * @function Helmet
 * @param {string} title - The title of the page
 * @returns {JSX}
 * @since 1.0.0
 * @version 1.0.0
 */
export const Helmet = ({ title }: { title: string }): JSX => {
	return (
		<TitleSwitcher>
			<title>{title}</title>
		</TitleSwitcher>
	);
};
