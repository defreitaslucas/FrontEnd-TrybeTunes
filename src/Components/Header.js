import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../header.css';

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
      <header data-testid="header-component" className="header">
        {
          isLoading ? <Carregando /> : (
            <>
              <h1>
                TrybeTunes
              </h1>
              <p data-testid="header-user-name" className="user">
                { user }
              </p>
              <nav className="nav">
                <Link to="/search" data-testid="link-to-search">Search</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                <Link to="/profile" data-testid="link-to-profile">Profile</Link>
              </nav>
            </>
          )
        }
      </header>
    );
  }
}
