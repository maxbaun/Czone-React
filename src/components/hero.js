import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import CSS from '../css/modules/hero.module.css';

const Hero = ({currentPage, parentPage}) => {
	const heroPage = parentPage && parentPage.id ? parentPage : currentPage;
	const image = heroPage.image && heroPage.image.localFile ? heroPage.image.localFile.childImageSharp.hero : null;
	const subtitle = heroPage.acf.heroSubtitle;
	const credit = heroPage.acf.heroCredit;

	let title = heroPage.acf.heroTitle;

	if (parentPage && parentPage.id) {
		title += ` | ${currentPage.acf.landingCity}, ${currentPage.acf.landingState}`;
	}

	if (!image) {
		return null;
	}

	return (
		<div className={CSS.hero}>
			<div className={CSS.inner}>
				<div className={CSS.image}>
					<Img
						sizes={image}
					/>
				</div>
				<div className={CSS.contentWrap}>
					<div className={CSS.content}>
						<div className="container">
							<div className={CSS.contentInner}>
								<h1 className={CSS.title}>{title}</h1>
								<h3 className={CSS.subtitle}>{subtitle}</h3>
								<span
									dangerouslySetInnerHTML={{__html: credit}} // eslint-disable-line react/no-danger
									className={CSS.credit}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Hero.propTypes = {
	currentPage: PropTypes.object.isRequired,
	parentPage: PropTypes.object
};

Hero.defaultProps = {
	parentPage: {}
};

export default Hero;
