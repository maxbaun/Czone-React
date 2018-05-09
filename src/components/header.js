import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import Logo from '../img/logo.png';
import {replaceLinks} from '../utils/wordpressHelpers';

const Header = ({menu}) => {
	return (
		<header className="banner navbar navbar-default navbar-static-top" role="banner">
			<div className="container-fluid">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
						<span className="sr-only">Toggle Navigation</span>
						<span className="icon-bar"/>
						<span className="icon-bar"/>
						<span className="icon-bar"/>
					</button>
					<Link className="navbar-brand" to="/">
						<img src={Logo}/>
					</Link>
				</div>
				<nav className="collapse navbar-collapse" role="navigation">
					<div className="menu-main-menu-container">
						<ul id="menu-main-menu" className="nav navbar-nav navbar-right">
							{menu.items && menu.items.map(item => {
								const itemClass = ['menu-item'];
								const hasDropdown = item.items && item.items.length > 0;

								if (hasDropdown) {
									itemClass.push('menu-item-has-children');
									itemClass.push('dropdown');
								}

								return (
									<li key={item.url} className={itemClass.join(' ')}>
										<Link
											dangerouslySetInnerHTML={{__html: item.title}} // eslint-disable-line react/no-danger
											to={replaceLinks(item.url)}
										/>
										{hasDropdown ?
											<ul role="menu" className="dropdown-menu">
												{item.items.map(child => {
													return (
														<li key={child.url}>
															<Link
																dangerouslySetInnerHTML={{__html: child.title}} // eslint-disable-line react/no-danger
																to={replaceLinks(child.url)}
															/>
														</li>
													);
												})}
											</ul> : null
										}
									</li>
								);
							})}
						</ul>
					</div>
				</nav>
			</div>
		</header>
	);
};

Header.propTypes = {
	menu: PropTypes.object
};

Header.defaultProps = {
	menu: {
		items: []
	}
};

export default Header;
