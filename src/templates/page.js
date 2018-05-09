import React from 'react';
import graphql from 'graphql';

import Head from '../components/head';
import Hero from '../components/hero';
import {initPageElements} from '../utils/pageHelpers';

export default class PageTemplate extends React.Component {
	componentDidMount() {
		initPageElements();
	}

	getHeroData() {
		const {wordpressPage, landingPageBase} = this.props.data;
		const heroPage = landingPageBase ? landingPageBase : wordpressPage;

		let title = heroPage.acf.heroTitle;

		if (landingPageBase) {
			title += ` | ${wordpressPage.acf.landingCity}, ${wordpressPage.acf.landingState}`;
		}

		return {
			image: heroPage.image && heroPage.image.localFile ? heroPage.image.localFile.childImageSharp.hero : null,
			title,
			subtitle: heroPage.acf.heroSubtitle,
			credits: heroPage.acf.heroCredit
		};
	}

	convertTitle(title) {
		const div = document.createElement('div');
		div.innerHTML = title;
		return div.textContent;
	}

	render() {
		const siteMeta = this.props.data.site.siteMeta;
		const currentPage = this.props.data.wordpressPage;
		const yoast = currentPage.yoast;
		const parentPage = this.props.data.landingPageBase;
		const hero = this.getHeroData();

		return (
			<div>
				<Head
					{...yoast}
					location={this.props.location}
					defaultTitle={`${this.convertTitle(currentPage.title)} | ${siteMeta.title}`}
					image={currentPage.image ? currentPage.image.localFile.childImageSharp.full.src : null}
					excerpt={currentPage.excerpt}
				/>
				{hero.image ?
					<Hero
						title={hero.title}
						subtitle={hero.subtitle}
						credits={hero.credit}
						image={hero.image}
					/> : null
				}
				<div className="container">
					<div className="page-content">
						<div className="bg-black">
							<div
								dangerouslySetInnerHTML={{__html: currentPage.content}} // eslint-disable-line react/no-danger
							/>
							{parentPage ?
								<div
									dangerouslySetInnerHTML={{__html: parentPage.content}} // eslint-disable-line react/no-danger
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
  wordpressPage(id: {eq: $id}) {
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
