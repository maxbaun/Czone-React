import React from 'react';
import PropTypes from 'prop-types';

import Head from './head';
import {htmlToString} from '../utils/componentHelpers';

const Seo = ({currentPage, location, siteMeta}) => {
	return (
		<Head
			{...currentPage.yoast}
			location={location}
			defaultTitle={`${htmlToString(currentPage.title)} | ${siteMeta.title}`}
			image={currentPage.image ? currentPage.image.localFile.childImageSharp.full.src : null}
			excerpt={currentPage.excerpt}
		/>
	)
};

Seo.propTypes = {
	currentPage: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	siteMeta: PropTypes.object.isRequired
};

export default Seo;
