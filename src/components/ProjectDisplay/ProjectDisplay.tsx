/**
 * @file The Index page to display all the projects
 * @author Matthew Moore
 * @module ProjectDisplay
 * @since 3.0.0
 * @version 3.0.5
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { JSX, project } from '../../types/types';
import { Helmet } from '../Helmet/Helmet';
import { projectData } from '../Projects/Projects';
import './projectdisplay.css';

/**
 * @desc The display page for all the projects
 * @constant
 * @function ProjectDisplay
 * @returns {JSX}
 * @since 3.0.0
 * @version 3.0.5
 */

export const ProjectDisplay = (): JSX => {
	return (
		<div id="projectLinks" data-testid="projectDisplay">
			<Helmet title="Project List" />

			<h1 id="displayTitle">Projects</h1>

			<nav id="projectDisplay">
				{projectData.projects.map((item: project, index: number) => (
					<NavLink to={item.location} key={index}>
						<div className="projectBox">
							<h3 className="projectTitle">{item.title}</h3>
							<img
								src={item.image}
								height={200}
								width={500}
								alt={`${item.title} example`}
							/>
						</div>
					</NavLink>
				))}
			</nav>
		</div>
	);
};
