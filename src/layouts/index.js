import React, {Component} from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import '../css/main.scss';

import Header from '../components/header';

export default class DefaultLayout extends Component {
	static propTypes = {
		children: PropTypes.func.isRequired,
		location: PropTypes.object.isRequired
	}

	// $('.gallery').each(function () {
	// 	$(this).imagesLoaded(function (e) {
	// 		var gallery = e.elements[0];
	// 		$(gallery).isotope({
	// 			itemSelector: '.gallery-item',
	// 			layoutMode: 'masonry'
	// 		});
	//
	// 		$(gallery).css('opacity', 1);
	// 	});
	// });

	render() {
		return (
			<div>
				<Header menu={this.props.data.mainMenu}/>
				<div>{this.props.children()}</div>
			</div>
		);
	}
}

export const mainMenuQuery = graphql`
query mainMenuQuery {
	mainMenu: wordpressWpApiMenusMenusItems(name: {eq: "Main Menu"}) {
		name
		items {
		  title
		  url
		  items: wordpress_children {
			title
			url
		  }
		}
	}
}
`;
