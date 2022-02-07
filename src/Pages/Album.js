import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../Components/Carregando';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albuns: [],
      trackList: [],
      favoriteSongs: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.requestMusic();
  }

  requestMusic = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ isLoading: true });
    const result = await getMusics(id);
    this.setState({
      albuns: result,
      trackList: result.slice(1),
      isLoading: false,
    });
    this.updateFavoriteSongs();
  }

  checkedFavoriteSongs = async ({ target }) => {
    const { trackList, favoriteSongs } = this.state;
    const musicChecked = (trackList.find((track) => track.trackId === Number(target.id)));
    this.setState({ isLoading: true });
    console.log(musicChecked);
    if (target.checked) {
      await addSong(musicChecked);
      this.setState({ isLoading: false,
        favoriteSongs: [...favoriteSongs, musicChecked] });
    }
    if (!target.checked) {
      await removeSong(trackList.find((track) => track.trackId === Number(target.id)));
      this.updateFavoriteSongs();
    }
  }

  updateFavoriteSongs = async () => {
    const array = await getFavoriteSongs();
    this.setState({ favoriteSongs: array, isLoading: false });
  }

  render() {
    const { albuns, trackList, isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          isLoading ? <Carregando /> : (
            <>
              <p data-testid="artist-name">
                {albuns.map(({ artistName }) => artistName)[0]}
              </p>
              <p data-testid="album-name">
                {
                  albuns.map(({ collectionName }) => collectionName)[0]
                }
              </p>
              <ul>
                {
                  trackList.map(({ trackName, previewUrl, trackId }, index) => (
                    <li key={ index }>
                      <MusicCard
                        trackName={ trackName }
                        previewUrl={ previewUrl }
                        trackId={ trackId }
                        checkedFavoriteSongs={ this.checkedFavoriteSongs }
                        isChecked={ favoriteSongs
                          .some((favoriteSong) => trackId === favoriteSong.trackId) }
                      />
                    </li>
                  ))
                }
              </ul>
            </>
          )
        }
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
