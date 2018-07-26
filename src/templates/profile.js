import React, {Component} from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';
import Img from 'gatsby-image';
import ReactPlayer from 'react-player';

import Modal from '../components/modal';
import Seo from '../components/seo';
import {initPageElements} from '../utils/pageHelpers';
import {innerHtml} from '../utils/wordpressHelpers';
import {click} from '../utils/componentHelpers';

export default class ProfileTemplate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalActive: false
		};

		this.handleModalToggle = this.handleModalToggle.bind(this);
	}

	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	};

	componentDidMount() {
		initPageElements();
	}

	handleModalToggle(modalActive) {
		this.setState({modalActive});
	}

	render() {
		const {profile, site} = this.props.data;
		const {modalActive} = this.state;

		const {facebook, instagram, video} = profile.acf;

		const showIcons = (facebook && facebook !== '') || (instagram && instagram !== '');

		return (
			<div>
				<Seo currentPage={profile} location={this.props.location} siteMeta={site.siteMeta}/>
				<Modal
					showHeader
					id="profileVideoModal"
					active={modalActive ? [modalActive] : []}
					onClose={click(this.handleModalToggle, false)}
					size="xl"
				>
					<div className="single-profile-modal">
						<ReactPlayer
							className="single-profile-modal-video"
							url={video}
							width="100%"
							height="100%"
							style={{
								margin: '0 auto'
							}}
						/>
					</div>
				</Modal>
				<section className="single-profile bg-black">
					<div className="container">
						<div className="page-content">
							<div className="single-profile-content">
								<div className="section-title text-center">
									<h1>
										<span
											dangerouslySetInnerHTML={innerHtml(profile.title)} // eslint-disable-line react/no-danger
											className="color-brand"
										/>{' '}
										<span className="title-breaker"/>{' '}
										<span
											dangerouslySetInnerHTML={innerHtml(profile.acf.title)} // eslint-disable-line react/no-danger
											className="profile-title"
										/>
									</h1>
								</div>
								<div className="single-profile-image text-center" style={{maxWidth: 440, margin: '0 auto'}}>
									<Img sizes={profile.image.localFile.childImageSharp.thumbnail}/>
									{video && video !== '' ? (
										<div className="single-profile-image-overlay">
											<span className="single-profile-play" onClick={click(this.handleModalToggle, true)}>
												<span className="fa fa-play"/>
											</span>
										</div>
									) : null}
								</div>
								<div className="single-profile-video-btn">
									<button className="btn btn-primary" onClick={click(this.handleModalToggle, true)}>
										Watch {profile.title}'s Video
									</button>
								</div>
								<div
									dangerouslySetInnerHTML={innerHtml(profile.content)} // eslint-disable-line react/no-danger
									className="single-profile-text"
								/>
								{showIcons ? (
									<div className="content-block single-profile-social text-right">
										{facebook && facebook !== '' ? <a href={facebook} target="__blank" className="fa fa-facebook"/> : null}
										{instagram && instagram !== '' ? <a href={instagram} target="__blank" className="fa fa-instagram"/> : null}
									</div>
								) : null}
							</div>
							<section className="text-center title-sm">
								<div className="section-title">
									<h1>
										<span className="color-brand">Testimonials </span>
										<span className="title-breaker"/>{' '}
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
