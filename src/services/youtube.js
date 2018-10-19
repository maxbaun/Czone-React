export default class YoutubePlaylist {
	constructor(playlistId, portfolioId) {
		this.playlistId = playlistId;
		this.portfolio = portfolioId;
		this.data = {};

		this.setPlaylistData = this.setPlaylistData.bind(this);
		this.getPlaylistItems = this.getPlaylistItems.bind(this);
		this.setPlaylistItemData = this.setPlaylistItemData.bind(this);
	}

	isReady() {
		return Boolean(window.gapi && window.gapi.client && window.gapi.client.youtube);
	}

	loadPlaylist() {
		return this.getPlaylist()
			.then(this.setPlaylistData)
			.then(this.getPlaylistItems)
			.then(this.setPlaylistItemData)
			.then(() => this.data);
	}

	getPlaylist() {
		return new Promise(resolve => {
			window.gapi.client.youtube.playlists.list({
				id: this.playlistId,
				part: 'snippet'
			}).execute(response => {
				resolve(response.result.items[0]);
			});
		});
	}

	setPlaylistData(playlist) {
		this.data = {
			description: playlist.snippet.description,
			title: playlist.snippet.title,
			thumbnail: playlist.snippet.thumbnails.medium || playlist.snippet.thumbnails.default
		};

		return Promise.resolve(this.data);
	}

	getPlaylistItems() {
		return new Promise(resolve => {
			window.gapi.client.youtube.playlistItems.list({
				playlistId: this.playlistId,
				maxResults: 30,
				part: 'snippet'
			}).execute(response => {
				resolve(response.result.items);
			});
		});
	}

	setPlaylistItemData(items) {
		this.data.items = items;

		return this.data;
	}
}
