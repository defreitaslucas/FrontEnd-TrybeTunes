import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../header.css';
import trybetunes from '../imagens/trybetunes.png';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({ isLoading: false, user: name });
  }

  render() {
    const { isLoading, user } = this.state;
    return (
      <header data-testid="header-component" className="header bg-lime-300 rounded">
        {
          isLoading ? <Carregando /> : (
            <>
              <img src={ trybetunes } alt="trybetunes" className="img" />
              <div className="rectangle">
                <div className="icon-user">
                  <FontAwesomeIcon
                    icon={ faUser }
                    className="icone"
                    size="xl"
                    fixedWidth
                    border
                  />
                </div>
                <span data-testid="header-user-name" className="user">
                  { user }
                </span>
              </div>
              <nav className="nav">
                <Link
                  to="/search"
                  data-testid="link-to-search"
                >
                  Search

                </Link>
                <Link
                  to="/favorites"
                  data-testid="link-to-favorites"
                >
                  Favorites

                </Link>
                <Link
                  to="/profile"
                  data-testid="link-to-profile"
                >
                  Profile

                </Link>
              </nav>
            </>
          )
        }
      </header>
    );
  }
}
