import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/youtubeGallery.module.css';
import Youtube from '../services/youtube';
import Modal from './modal';
import {click} from '../utils/componentHelpers';

export default class YoutubeGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      activeVideo: false
    };

    this.youtube = null;

    this.setPlaylistData = this.setPlaylistData.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    playlistId: PropTypes.string.isRequired,
    portfolio: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.getPlaylist();
  }

  getPlaylist() {
    if (!this.youtube) {
      this.youtube = new Youtube(this.props.playlistId, this.props.portfolio);
    }

    if (this.youtube.isReady()) {
      return this.youtube.loadPlaylist().then(this.setPlaylistData);
    }

    if (window.gapi && window.gapi.client) {
      const gapiKey = 'AIzaSyDtEqnQKxyViJO01fe7ajPL5zRWGjWbk1Q';

      window.gapi.client.setApiKey(gapiKey);
      window.gapi.client.load('youtube', 'v3', () => {
        window.youtubeLoaded = true;
      });
    }

    return setTimeout(() => this.getPlaylist(), 150);
  }

  setPlaylistData(data) {
    this.setState({data});
  }

  handleClose() {
    this.setState({activeVideo: false});
  }

  handleClick(activeVideo) {
    this.setState({activeVideo});
  }

  render() {
    const {data, activeVideo} = this.state;

    return (
      <div className="portfolio youtube-portfolio">
        <Modal
          id={`${this.props.portfolio}-modal`}
          active={activeVideo ? [activeVideo] : []}
          onClose={this.handleClose}
          size="auto"
          showClose={false}
        >
          <div className={CSS.videoWrap}>
            {activeVideo ? (
              <iframe
                src={`//www.youtube.com/embed/${activeVideo.snippet.resourceId.videoId}`}
                width="100%"
                height="100%"
                frameBorder="0"
              />
            ) : null}
          </div>
        </Modal>
        <div className="youtube-portfolio-content">
          <h3 className="youtube-portfolio-title">{data.title}</h3>
          <p className="youtube-portfolio-description">{data.description}</p>
        </div>
        <div className="youtube-portfolio-items text-right">
          {data && !data.items ? (
            <span className="content-loader" />
          ) : (
            data.items.map(item => {
              const style = {
                backgroundImage: item.snippet.thumbnails.medium ? `url(${item.snippet.thumbnails.medium.url})` : null
              };

              return (
                <div key={item.id} className="portfolio-item youtube-portfolio-item" style={style}>
                  <a onClick={click(this.handleClick, item)}>
                    <div className="portfolio-item-content youtube-portfolio-item-content">
                      <p className="portfolio-item-content-title youtube-portfolio-item-content-title">
                        {item.snippet.title}
                      </p>
                    </div>
                  </a>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
