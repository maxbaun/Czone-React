import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';
import Helmet from 'react-helmet';

import Seo from '../components/seo';
import {initPageElements} from '../utils/pageHelpers';
import PlainText from '../img/photobooth-fonts-plain-text.jpg';
import Script from '../img/photobooth-fonts-scripts.jpg';

export default class IndexPage extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	};

	componentDidMount() {
		initPageElements();
	}

	render() {
		const {site} = this.props.data;

		const PageData = {
			title: 'Photo Booth Backdrops'
		};

		const imgStyle = {
			display: 'block',
			maxWidth: '75%',
			margin: '0 auto'
		};

		const blockStyle = {
			margin: '0 0 20'
		};

		return (
			<div>
				<Seo currentPage={PageData} location={this.props.location} siteMeta={site.siteMeta}/>
				<Helmet>
					<meta name="robots" content="noindex"/>
				</Helmet>
				<div className="container">
					<section className="text-center">
						<div className="section-title">
							<h1 className="">
								<span className="color-brand">{PageData.title}</span>
								<span className="title-breaker"/>
								<span className="color-white"> C-Zone Entertainment</span>
							</h1>
						</div>
					</section>

					<div className="row">
						<div className="col-xs-6 col-sm-3">
							<div style={blockStyle}>
								<div className="section-title text-center">
									<h1>Backdrop 1</h1>
								</div>
								<img src={PlainText} style={imgStyle} alt="Photo Booth Fonts - Plain Text"/>
							</div>
						</div>
						<div className="col-xs-6 col-sm-3">
							<div style={blockStyle}>
								<div className="section-title text-center">
									<h1>Backdrop 2</h1>
								</div>
								<img src={Script} style={imgStyle} alt="Photo Booth Fonts - Script"/>
								<br/>
							</div>
						</div>
						<div className="col-xs-6 col-sm-3">
							<div style={blockStyle}>
								<div className="section-title text-center">
									<h1>Backdrop 3</h1>
								</div>
								<img src={PlainText} style={imgStyle} alt="Photo Booth Fonts - Plain Text"/>
							</div>
						</div>
						<div className="col-xs-6 col-sm-3">
							<div style={blockStyle}>
								<div className="section-title text-center">
									<h1>Backdrop 4</h1>
								</div>
								<img src={Script} style={imgStyle} alt="Photo Booth Fonts - Script"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export const pageQuery = graphql`
	query backdropPageQuery {
		site {
			...Site
		}
	}
`;
