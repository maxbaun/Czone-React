import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import CSS from '../css/modules/hero.module.css';

const Hero = ({title, subtitle, image, credit}) => {
	console.log(image);
	return (
		<div className={CSS.hero}>
			<div className={CSS.inner}>
				<div className={CSS.image}>
					<Img
						resolutions={image}
					/>
				</div>
				<div className={CSS.content}>
					<h1 className={CSS.title}>{title}</h1>
					<h3 className={CSS.subtitle}>{subtitle}</h3>
					<span
						dangerouslySetInnerHTML={{__html: credit}} // eslint-disable-line react/no-danger
						className={CSS.credit}
					/>
				</div>
			</div>
		</div>
	);
};

Hero.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	image: PropTypes.object.isRequired,
	credit: PropTypes.string
};

Hero.defaultProps = {
	title: '',
	subtitle: '',
	credit: ''
};

export default Hero;
