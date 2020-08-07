/**
 * @file Export shorthand types for long type expressions
 * @author Matthew Moore
 * @since 1.0.0
 * @version 3.0.0
 */

/**
 * @desc Shorthand for JSX.Element
 * @typedef {JSX.Element} JSX
 * @since 1.0.0
 * @version 1.0.0
 */
export type JSX = JSX.Element;

/**
 * @desc Shorthand for React.ChangeEvent<HTMLTextAreaElement>
 * @typedef {React.ChangeEvent<HTMLTextAreaElement>} InputEvent
 * @since 1.0.0
 * @version 1.0.0
 */
export type InputEvent = React.ChangeEvent<HTMLTextAreaElement>;

/**
 * @desc Shorthand for React.ChangeEvent<HTMLInputElement>
 * @typedef {React.ChangeEvent<HTMLInputElement>} InputEvent
 * @since 2.0.0
 * @version 2.0.0
 */
export type InputChange = React.ChangeEvent<HTMLInputElement>;

/**
 * @desc Shorthand for React.MouseEvent<HTMLButtonElement, MouseEvent>
 * @typedef {React.MouseEvent<HTMLButtonElement, MouseEvent>} InputEvent
 * @since 2.0.0
 * @version 2.0.0
 */
export type ButtonClick = React.MouseEvent<HTMLButtonElement, MouseEvent>;

/**
 * @desc A singular project
 * @typedef {Object} project
 * @property {string} location - The location of the project
 * @property {string} title - The title of the project
 * @property {string} image - The location of the image for the project
 * @since 3.0.0
 * @version 3.0.0
 */
export interface project {
	location: string;
	title: string;
	image: string;
}

/**
 * @desc A list of projects
 * @typedef {Object} projects
 * @property {project[]} projects - The list of projects
 * @since 3.0.0
 * @version 3.0.0
 */
export interface projects {
	projects: project[];
}
