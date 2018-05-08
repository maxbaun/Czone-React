import React from 'react';
import Link from 'gatsby-link';

import Logo from '../img/logo.png';

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
					<a className="navbar-brand" href="<?= esc_url(home_url('/')); ?>">
						<img src={Logo}/>
					</a>
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
											to={getLink(item.url)}
										/>
										{hasDropdown ?
											<ul role="menu" className="dropdown-menu">
												{item.items.map(child => {
													return (
														<li key={child.url}>
															<Link
																dangerouslySetInnerHTML={{__html: child.title}} // eslint-disable-line react/no-danger
																to={getLink(child.url)}
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

function getLink(link) {
	return link
		.replace('http://czone.info', '')
		.replace('https://czone.info', '')
		.replace('http://czonemusic.com', '')
		.replace('https://czonemusic.com', '');
}

export default Header;
