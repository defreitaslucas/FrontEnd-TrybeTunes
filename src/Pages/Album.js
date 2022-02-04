import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albuns: [],
      trackList: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({
      albuns: result,
      trackList: result.slice(1),
    });
  }

  render() {
    const { albuns, trackList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{albuns.map(({ artistName }) => artistName)[0]}</p>
        <p data-testid="album-name">
          {
            albuns.map(({ collectionName }) => collectionName)[0]
          }
        </p>
        <ul>
          {
            trackList.map((music, index) => (
              <li key={ index }>
                <MusicCard
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                />
              </li>
            ))
          }
        </ul>
      </div>);
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
