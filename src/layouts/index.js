import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Flickity from 'flickity';
import imagesLoaded from 'imagesloaded';
import Isotope from 'isotope-layout';

import '../css/main.scss';

export default class DefaultLayout extends Component {
	static propTypes = {
		children: PropTypes.func.isRequired,
		location: PropTypes.object.isRequired
	}

	componentDidMount() {
		this.initCarousel();
		this.initDjep();
		this.initGallery();
		window.WeddingWire.ensureInit(() => {
			window.WeddingWire.createWWRated2013({
				vendorId: '45a90fd32bc668fa'
			});
		});
	}

	initCarousel() {
		const carousel = Array.from(document.querySelectorAll('.js-flickity'));

		carousel.forEach(elem => {
			let options = elem.getAttribute('data-flickity-options');
			options = JSON.parse(options);
			new Flickity(elem, options); // eslint-disable-line no-new

			elem.style.opacity = 1;
		});
	}

	initDjep() {
		window.SendPasswordWindow = () => {
			const w = window.open(
				'http://czoneplanning.com/sendpassword.asp?typeoflogon=client',
				'w',
				'width=350,height=150,menubar=no,scrollbars=no,resizable=yes,location=no,directories=no,status=no'
			);

			w.focus();
		};
	}

	initGallery() {
		const galleries = Array.from(document.querySelectorAll('.gallery'));

		galleries.forEach(gallery => {
			imagesLoaded(gallery, () => {
				new Isotope(gallery, { // eslint-disable-line no-new
					itemSelector: '.gallery-item',
					layoutMode: 'masonry'
				});
				gallery.style.opacity = 1;
			});
		});
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
			<div>{this.props.children()}</div>
		);
	}
}
