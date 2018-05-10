import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import {replaceLinks, innerHtml} from '../utils/wordpressHelpers';

const PageNav = ({links}) => {
	return (
		<div className="widget czone-page-nav-2 czone-page-nav-class">
			<ul className="bg-blue page-nav">
				{links && links.map(link => {
					return (
						<li key={link.url}>
							<Link
								dangerouslySetInnerHTML={innerHtml(link.title)} // eslint-diable-line react/no-danger
								to={replaceLinks(link.url)}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

PageNav.propTypes = {
	links: PropTypes.array
};

PageNav.defaultProps = {
	links: []
};

export default PageNav;
