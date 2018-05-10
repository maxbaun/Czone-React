import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import Logo from '../img/logo.png';
import {replaceLinks} from '../utils/wordpressHelpers';
import {click, clickPrevent, ref} from '../utils/componentHelpers';

export default class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menuActive: false
		};

		this.menu = null;
		this.toggle = null;
		this.handleToggle = this.handleToggle.bind(this);
		this.checkClick = this.checkClick.bind(this);
	}

	static propTypes = {
		menu: PropTypes.object
	}

	static defaultProps = {
		menu: {
			items: []
		}
	}

	componentDidMount() {
		document.addEventListener('click', this.checkClick);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.checkClick);
	}

	checkClick(e) {
		if (
			(this.menu && this.menu.contains(e.target)) ||
			(this.toggle && this.toggle.contains(e.target))
		) {
			return;
		}

		this.setState({menuActive: false});
	}

	handleToggle(menuActive) {
		this.setState({menuActive});
	}

	render() {
		const {menu} = this.props;
		const {menuActive} = this.state;

		const navClasses = ['collapse', 'navbar-collapse'];

		if (menuActive) {
			navClasses.push('in');
		}

		return (
			<header className="banner navbar navbar-default navbar-static-top" role="banner">
				<div className="container-fluid">
					<div className="navbar-header">
						<button ref={ref.call(this, 'toggle')} onClick={clickPrevent(this.handleToggle, !menuActive)} type="button" className="navbar-toggle collapsed">
							<span className="sr-only">Toggle Navigation</span>
							<span className="icon-bar"/>
							<span className="icon-bar"/>
							<span className="icon-bar"/>
						</button>
						<Link className="navbar-brand" to="/" onClick={click(this.handleToggle, false)}>
							<img src={Logo}/>
						</Link>
					</div>
					<nav ref={ref.call(this, 'menu')} className={navClasses.join(' ')} role="navigation">
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
												onClick={click(this.handleToggle, false)}
											/>
											{hasDropdown ?
												<ul role="menu" className="dropdown-menu">
													{item.items.map(child => {
														return (
															<li key={child.url}>
																<Link
																	dangerouslySetInnerHTML={{__html: child.title}} // eslint-disable-line react/no-danger
																	to={replaceLinks(child.url)}
																	onClick={click(this.handleToggle, false)}
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
	}
}
