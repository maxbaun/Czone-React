import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import Hero from '../components/hero';
import Seo from '../components/seo';
import {initPageElements} from '../utils/pageHelpers';
import {innerHtml} from '../utils/wordpressHelpers';

export default class PageTemplate extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	}

	componentDidMount() {
		initPageElements();
	}

	render() {
		const {currentPage, site, landingPageBase} = this.props.data;

		return (
			<div>
				<Seo
					currentPage={currentPage}
					location={this.props.location}
					siteMeta={site.siteMeta}
				/>
				<Hero
					currentPage={currentPage}
					parentPage={landingPageBase}
				/>
				<div className="container">
					<div className="page-content">
						<div className="bg-black">
							<div
								dangerouslySetInnerHTML={innerHtml(currentPage.content)} // eslint-disable-line react/no-danger
							/>
							{landingPageBase ?
								<div
									dangerouslySetInnerHTML={innerHtml(landingPageBase.content)} // eslint-disable-line react/no-danger
								/> : null
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export const pageQuery = graphql`
query defaultPageQuery($id: String!, $landingPageBase: Int = 0) {
  currentPage: wordpressPage(id: {eq: $id}) {
	...Page
  }
  landingPageBase: wordpressPage(wordpress_id: {eq: $landingPageBase}) {
	  ...Page
  }
  site {
	...Site
  }
}
`;
