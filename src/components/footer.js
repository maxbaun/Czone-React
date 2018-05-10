import React from 'react';
import PropTypes from 'prop-types';

import FooterMenu from './footerMenu';

const Footer = ({footer1, footer2, footer3}) => {
	return (
		<footer className="bg-black">
			<div className="container">
				<div className="row">
					<div className="col-lg-offset-3 col-md-offset-3 col-lg-2 col-md-2 col-sm-4 col-xs-12">
						<div className="widget widget_nav_menu">
							<h3>SERVICES</h3>
							<FooterMenu
								items={footer1.items}
							/>
						</div>
					</div>
					<div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
						<div className="widget widget_nav_menu">
							<h3>NAVIGATION</h3>
							<FooterMenu
								items={footer2.items}
							/>
						</div>
					</div>
					<div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
						<div className="widget widget_nav_menu">
							<h3>SOCIAL</h3>
							<FooterMenu
								items={footer3.items}
							/>
						</div>
					</div>
				</div>
				<div className="row copyright">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="widget">
							© 2003-2015 C-Zone Entertainment. All Rights Reserved. | 617.320.0723 | contact@czonemusic.com
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
};

Footer.propTypes = {
	footer1: PropTypes.object,
	footer2: PropTypes.object,
	footer3: PropTypes.object
};

Footer.defaultProps = {
	footer1: {},
	footer2: {},
	footer3: {}
};

export default Footer;
