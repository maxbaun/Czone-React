import React from 'react';
import {render} from 'react-dom';

import YoutubeGallery from './components/youtubeGallery';

module.exports = class YoutubeReact {
	constructor(el) {
		const playlistId = el.getAttribute('data-youtube-playlist');
		const portfolio = el.getAttribute('data-portfolio');

		render(
			<YoutubeGallery
				playlistId={playlistId}
				portfolio={portfolio}
			/>
			,
			el
		);
	}
};
