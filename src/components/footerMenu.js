import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import {
	replaceLinks,
	innerHtml,
	isExternalLink
} from '../utils/wordpressHelpers';

const FooterMenu = ({items}) => {
	return (
		<ul>
			{items &&
				items.map(item => {
					return (
						<li key={item.url}>
							{isExternalLink(item.url) ? (
								<a href={item.url}>{item.title}</a>
							) : (
								<Link
									dangerouslySetInnerHTML={innerHtml(item.title)} // eslint-diable-line react/no-danger
									to={replaceLinks(item.url)}
								/>
							)}
						</li>
					);
				})}
		</ul>
	);
};

FooterMenu.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object)
};

FooterMenu.defaultProps = {
	items: []
};

export default FooterMenu;
