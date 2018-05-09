import React from 'react';
import graphql from 'graphql';

import Head from '../components/head';
import {initPageElements} from '../utils/pageHelpers';

export default class PageTemplate extends React.Component {
	componentDidMount() {
		initPageElements();
	}

	render() {
		const siteMeta = this.props.data.site.siteMeta;
		const currentPage = this.props.data.wordpressPage;
		const yoast = currentPage.yoast;

		return (
			<div>
				<Head
					{...yoast}
					location={this.props.location}
					defaultTitle={`${siteMeta.title} | ${currentPage.title}`}
					image={currentPage.image.localFile ? currentPage.image.localFile.childImageSharp.full.src : null}
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
  wordpressPage(id: { eq: $id }) {
	...Page
  }
  site {
	...Site
  }
}
`;
