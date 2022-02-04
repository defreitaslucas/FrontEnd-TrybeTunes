import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId,
      isChecked, checkedFavoriteSongs } = this.props;
    return (
      <div>
        {trackName}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          <input
            type="checkbox"
            name="favorite"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ checkedFavoriteSongs }
            checked={ isChecked }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  trackName: PropTypes.string,
  checkedFavoriteSongs: PropTypes.func,
  isChecked: PropTypes.bool,
}.isRequired;
