import React from 'react';
import graphql from 'graphql';
import Img from 'gatsby-image';

import {Page, Site} from './query';
import Meta from '../components/meta';
import Hero from '../components/hero';

export default class PageTemplate extends React.Component {
	render() {
		const siteMetadata = this.props.data.site.siteMetadata;
		const currentPage = this.props.data.wordpressPage;
		const yoast = currentPage.yoast;

		console.log(currentPage);

		return (
			<div>
				<Meta {...yoast}/>
				<Hero
					title={currentPage.acf.heroTitle}
					subtitle={currentPage.acf.heroSubtitle}
					credits={currentPage.acf.heroCredit}
					image={currentPage.image.localFile.childImageSharp.resolutions}
				/>
				<div className="container">
					<div className="page-content">
						<div className="bg-black">
							<div
								dangerouslySetInnerHTML={{__html: currentPage.content}} // eslint-disable-line react/no-danger
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export const pageQuery = graphql`
  query pageTemplateQuery($id: String!) {
    wordpressPage(id: { eq: $id }) {
      ...Page
    }
    site {
      ...Site
    }
  }
`;
