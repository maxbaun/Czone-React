import React, {Component} from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import '../css/main.scss';

import Header from '../components/header';
import Footer from '../components/footer';

export default class DefaultLayout extends Component {
	static propTypes = {
		children: PropTypes.func.isRequired,
		location: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired
	}

	render() {
		const {footer1, footer2, footer3} = this.props.data;

		return (
			<div>
				<Header
					menu={this.props.data.mainMenu}
				/>
				<div className="wrap" role="document">
					<div className="content">
						<main className="main">
							{this.props.children()}
						</main>
					</div>
				</div>
				<Footer
					footer1={footer1}
					footer2={footer2}
					footer3={footer3}
				/>
			</div>
		);
	}
}

export const mainMenuQuery = graphql`
query menuQuery {
	mainMenu: wordpressWpApiMenusMenusItems(name: {eq: "Main Menu"}) {
		...MenuItems
	}
	footer1: wordpressWpApiMenusMenusItems(name: {eq: "Footer 1"}) {
		...MenuItems
	}
	footer2: wordpressWpApiMenusMenusItems(name: {eq: "Footer 2"}) {
		...MenuItems
	}
	footer3: wordpressWpApiMenusMenusItems(name: {eq: "Footer 3"}) {
		...MenuItems
	}
}
`;
