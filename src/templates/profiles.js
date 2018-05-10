import React, {Component} from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import Hero from '../components/hero';
import Seo from '../components/seo';
import {initPageElements} from '../utils/pageHelpers';
import {innerHtml, sortByMenuOrder} from '../utils/wordpressHelpers';
import CSS from '../css/modules/profiles.module.css';

export default class ProfilesTemplate extends Component {
	constructor(props) {
		super(props);

		this.renderItem = this.renderItem.bind(this);
	}

	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	}

	componentDidMount() {
		initPageElements();
	}

	render() {
		const {currentPage, site, djs, musicians} = this.props.data;

		const sortedDjs = djs && djs.edges && djs.edges.length ? sortByMenuOrder(djs.edges) : [];
		const sortedMusicians = musicians && musicians.edges && musicians.edges.length ? sortByMenuOrder(musicians.edges) : [];

		return (
			<div>
				<Seo
					currentPage={currentPage}
					location={this.props.location}
					siteMeta={site.siteMeta}
				/>
				<Hero
					currentPage={currentPage}
				/>
				<div className="container">
					<div className="page-content">
						<div className="bg-black">
							<div
								dangerouslySetInnerHTML={innerHtml(currentPage.content)} // eslint-disable-line react/no-danger
							/>
							<section className="text-center">
								<div className="section-title">
									<h1>
										<span className="color-brand">Disc Jockeys</span>
									</h1>
								</div>
								<div className={CSS.profileList}>
									{sortedDjs && sortedDjs.map(dj => {
										return this.renderItem(dj.node);
									})}
								</div>
							</section>
							<section className="text-center">
								<div className="section-title">
									<h1>
										<span className="color-brand">Musicians</span>
									</h1>
								</div>
								<div className={CSS.profileList}>
									{sortedMusicians && sortedMusicians.map(musician => {
										return this.renderItem(musician.node);
									})}
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderItem(item) {
		return (
			<div key={item.slug} className={CSS.profile}>
				<Link to={`/profile/${item.slug}`}>
					<div className={CSS.profileImage}>
						<Img sizes={item.image.localFile.childImageSharp.thumbnail} />
					</div>
					<div className={CSS.profileOverlay}>
						<p className={CSS.profileTitle}>{item.title}</p>
					</div>
				</Link>
			</div>
		);
	}
}

export const pageQuery = graphql`
query profilesQuery($id: String!) {
	currentPage: wordpressPage(id: {eq: $id}) {
	  ...Page
	}
	musicians: allWordpressWpProfile(filter: {profile_category: {eq: 15}}) {
	  edges {
		node {
			...ProfilePreview
		}
	  }
	}
	djs: allWordpressWpProfile(filter: {profile_category: {eq: 14}}) {
	  edges {
		node {
			...ProfilePreview
		}
	  }
	}
	site {
		...Site
	}
}
`;
