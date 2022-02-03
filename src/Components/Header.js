import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: true,
    };
  }

  handleGetUser = async () => {
    await getUser();
    this.setState({ user: result, isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          {this.handleGetUser}
          {user}
        </p>
        {
          isLoading ? <Carregando /> : (
            <h1>
              Trybe Tunes
            </h1>
          )
        }
      </header>
    );
  }
}
