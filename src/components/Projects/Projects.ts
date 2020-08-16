import { projects } from '../../types/types';
import bin2dec from '../../images/bin2dec.png';
import borderradius from '../../images/borderradius.png';
import calculator from '../../images/calculator.png';

export const projectData: projects = {
	projects: [
		{
			location: '/bin2dec',
			title: 'Binary to Decimal',
			image: bin2dec,
		},
		{
			location: '/borderradius',
			title: 'Border Radius Previewer',
			image: borderradius,
		},
		{
			location: '/calculator',
			title: 'Calculator',
			image: calculator,
		},
	],
};
