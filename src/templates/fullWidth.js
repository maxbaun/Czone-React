import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import Seo from '../components/seo';
import {initPageElements} from '../utils/pageHelpers';

export default class FullWidthTemplate extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	}

	componentDidMount() {
		initPageElements();
	}

	render() {
		const {site, currentPage} = this.props.data;

		return (
			<div>
				<Seo
					currentPage={currentPage}
					location={this.props.location}
					siteMeta={site.siteMeta}
				/>
				<div
					dangerouslySetInnerHTML={{__html: currentPage.content}} // eslint-disable-line react/no-danger
				/>
			</div>
		);
	}
}

export const pageQuery = graphql`
query fullWidthPageQuery($id: String!) {
  currentPage: wordpressPage(id: { eq: $id }) {
	...Page
  }
  site {
	...Site
  }
}
`;
