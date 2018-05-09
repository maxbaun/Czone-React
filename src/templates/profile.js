import React, {Component} from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';
import Img from 'gatsby-image';

import Seo from '../components/seo';
import {initPageElements} from '../utils/pageHelpers';
import {innerHtml} from '../utils/wordpressHelpers';

export default class ProfileTemplate extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	}

	componentDidMount() {
		initPageElements();
	}

	render() {
		const {profile, site} = this.props.data;

		console.log(profile);
		const {facebook, instagram} = profile.acf;

		const showIcons = (facebook && facebook !== '') || (instagram && instagram !== '');

		return (
			<div>
				<Seo
					currentPage={profile}
					location={this.props.location}
					siteMeta={site.siteMeta}
				/>
				<section className="single-profile bg-black">
					<div className="container">
						<div className="page-content">
							<div className="single-profile-content">
								<div className="section-title text-center">
									<h1>
										<span
											dangerouslySetInnerHTML={innerHtml(profile.title)} // eslint-disable-line react/no-danger
											className="color-brand"
										/>
										{' '}
										<span className="title-breaker"/>
										{' '}
										<span
											dangerouslySetInnerHTML={innerHtml(profile.acf.title)} // eslint-disable-line react/no-danger
											className="profile-title"
										/>
									</h1>
								</div>
								<div className="single-profile-image text-center" style={{maxWidth: 440, margin: '0 auto'}}>
									<Img
										sizes={profile.image.localFile.childImageSharp.thumbnail}
									/>
								</div>
								<div
									dangerouslySetInnerHTML={innerHtml(profile.content)} // eslint-disable-line react/no-danger
									className="single-profile-text"
								/>
								{showIcons ?
									<div className="content-block single-profile-social text-right">
										{facebook && facebook !== '' ?
											<a href={facebook} target="__blank" className="fa fa-facebook"/> : null
										}
										{instagram && instagram !== '' ?
											<a href={instagram} target="__blank" className="fa fa-instagram"/> : null
										}
									</div> : null
								}
							</div>
							<section className="text-center title-sm">
								<div className="section-title">
									<h1>
										<span className="color-brand">Testimonials </span>
										<span className="title-breaker"/>
										{' '}
										<span
											className="color-white"
											dangerouslySetInnerHTML={innerHtml(profile.title)} // eslint-disable-line react/no-danger
										/>
									</h1>
								</div>
								<div
									dangerouslySetInnerHTML={innerHtml(profile.acf.testimonials)} // eslint-disable-line react/no-danger
								/>
							</section>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export const pageQuery = graphql`
query profileQuery($id: String!) {
  profile: wordpressWpProfile(id: {eq: $id}) {
	...Profile
  }
  site {
	...Site
  }
}
`;
