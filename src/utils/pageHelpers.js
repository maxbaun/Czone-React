let Flickity;
let imagesLoaded;
let Isotope;
let baguetteBox;

import YoutubeReact from '../youtubeReact';
import {ScrollTo} from './componentHelpers';

export const initPageElements = () => {
	Flickity = require('flickity');
	imagesLoaded = require('imagesLoaded');
	Isotope = require('isotope-layout');
	baguetteBox = require('baguettebox.js');

	initCarousel();
	initDjep();
	initWeddingWire();
	initGallery();
	initYoutubeGalleries();
	initScrolls();
	initProfiles();
};

function initCarousel() {
	const carousel = Array.from(document.querySelectorAll('.js-flickity'));

	carousel.forEach(elem => {
		let options = elem.getAttribute('data-flickity-options');
		options = JSON.parse(options);
		new Flickity(elem, options); // eslint-disable-line no-new

		elem.style.opacity = 1;
	});
}

function initDjep() {
	window.SendPasswordWindow = () => {
		const w = window.open(
			'http://czoneplanning.com/sendpassword.asp?typeoflogon=client',
			'w',
			'width=350,height=150,menubar=no,scrollbars=no,resizable=yes,location=no,directories=no,status=no'
		);

		w.focus();
	};
}

function initWeddingWire() {
	const testimonitalsWidget = document.querySelector('#ww-widget-reviews');

	if (testimonitalsWidget) {
		window.WeddingWire.createReview({
			vendorId: '45a90fd32bc668fa',
			id: 'ww-widget-reviews'
		});
	}

	window.WeddingWire.ensureInit(() => {
		window.WeddingWire.createWWRated2013({
			vendorId: '45a90fd32bc668fa'
		});
	});
}

function initGallery() {
	const galleries = Array.from(document.querySelectorAll('.gallery'));

	galleries.forEach(gallery => {
		imagesLoaded(gallery, () => {
			new Isotope(gallery, { // eslint-disable-line no-new
				itemSelector: '.gallery-item',
				layoutMode: 'masonry'
			});
			gallery.style.opacity = 1;

			baguetteBox.run('.gallery');
		});
	});
}

function initProfiles() {
	const profiles = Array.from(document.querySelectorAll('.profile-portfolio'));

	profiles.forEach(profile => {
		imagesLoaded(profile, () => {
			new Isotope(profile, { // eslint-disable-line no-new
				itemSelector: '.portfolio-item',
				layoutMode: 'masonry'
			});

			profile.style.opacity = 1;
		});
	});
}

function initYoutubeGalleries() {
	window.handleGoogleLoad = () => {};

	const galleries = Array.from(document.querySelectorAll('[data-youtube-playlist]'));

	galleries.forEach(gallery => {
		new YoutubeReact(gallery); // eslint-disable-line no-new
	});
}

function initScrolls() {
	const scrolls = Array.from(document.querySelectorAll('[data-scroll'));

	scrolls.forEach(scroll => {
		const to = scroll.getAttribute('data-scroll');
		const toElem = document.querySelector(to);

		scroll.addEventListener('click', () => {
			// eslint-disable-next-line no-new
			new ScrollTo(toElem, {
				container: window,
				duration: 300
			});
		});
	});
}
