import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import Seo from '../components/seo';
import {initPageElements} from '../utils/pageHelpers';

export default class IndexPage extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	}

	componentDidMount() {
		initPageElements();
	}

	render() {
		const {site, homePage} = this.props.data;

		return (
			<div>
				<Seo
					currentPage={homePage}
					location={this.props.location}
					siteMeta={site.siteMeta}
				/>
				<div
					dangerouslySetInnerHTML={{__html: homePage.content}} // eslint-disable-line react/no-danger
				/>
			</div>
		);
	}
}

export const pageQuery = graphql`
query homePageQuery {
  homePage: wordpressPage(slug: {eq: "home"}) {
	...Page
  }
  site {
	...Site
  }
}
`;
