import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
// import Carregando from './Carregando';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      // isLoading: false,
    };
  }

  handleGetUser = async () => {
    const { user } = this.state;
    const result = await getUser();
    console.log(result);
    this.setState({ user: result });
    return user;
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          {user}
        </p>
      </header>
    );
  }
}
