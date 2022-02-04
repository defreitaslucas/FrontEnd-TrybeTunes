import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../Components/Carregando';
import Header from '../Components/Header';
import '../search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const TAMANHO = 2;
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      isButtonDisabled: true,
      isLoading: false,
      artistName: '',
      albuns: [],
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

  handleButtonClick = () => {
    const { search } = this.state;
    this.setState({ isLoading: true, artistName: search }, async () => {
      const result = await searchAlbumsAPI(search);
      this.setState({
        isLoading: false,
        albuns: result,
      });
    });
    this.setState({ search: '' });
  }

  render() {
    const { isButtonDisabled, search, isLoading, albuns, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          isLoading ? <Carregando /> : (
            <>
              <form className="form-input">
                <label htmlFor="search-input">
                  <input
                    type="text"
                    name="search-input"
                    data-testid="search-artist-input"
                    onChange={ this.onInputChangeSearch }
                    placeholder="Digite nome do artista/banda"
                    value={ search }
                  />
                </label>
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ isButtonDisabled }
                  onClick={ this.handleButtonClick }
                >
                  Pesquisar
                </button>
              </form>
              <h2>
                {albuns.length !== 0
                  ? `Resultado de álbuns de: ${artistName}`
                  : 'Nenhum álbum foi encontrado'}
              </h2>
              <ul>
                {albuns.map((album) => (
                  <li key={ album.collectionId }>
                    <Link
                      data-testid={ `link-to-album-${album.collectionId}` }
                      to={ `/album/${album.collectionId}` }
                    >
                      { album.collectionName }
                    </Link>
                  </li>
                ))}
              </ul>

            </>
          )
        }
      </div>
    );
  }
}

export default Search;
