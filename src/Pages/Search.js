import React from 'react';
import Header from '../Components/Header';
import '../search.css';

const TAMANHO = 2;
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      isButtonDisabled: true,
    };
  }

  onInputChangeSearch = ({ target: { value } }) => {
    this.setState({ search: value }, () => {
      const array = Object.values(this.state);
      if (array.some((item) => item.length >= TAMANHO)) {
        this.setState({ isButtonDisabled: false });
      } else {
        this.setState({ isButtonDisabled: true });
      }
    });
  }

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <form className="form-input">
            <label htmlFor="search-input">
              <input
                type="text"
                name="search-input"
                data-testid="search-artist-input"
                onChange={ this.onInputChangeSearch }
                placeholder="Digite nome do artista/banda"
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isButtonDisabled }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
