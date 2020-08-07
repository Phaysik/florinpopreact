import { projects } from '../../types/types';
import bin2dec from '../../images/bin2dec.png';
import borderradius from '../../images/borderradius.png';

const images = {
	bin2dec: bin2dec,
	borderradius: borderradius,
};

export const projectData: projects = {
	projects: [
		{
			location: '/bin2dec',
			title: 'Binary to Decimal',
			image: images['bin2dec'],
		},
		{
			location: '/borderradius',
			title: 'Border Radius Previewer',
			image: images['borderradius'],
		},
	],
};
