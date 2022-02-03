import React from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../Components/Carregando';
import { createUser } from '../services/userAPI';

const TAMANHO = 3;
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isEnterButtonDisabled: true,
      redirect: false,
      isLoading: false,
    };
  }

  onInputChange = ({ target: { value } }) => {
    this.setState({ name: value }, () => {
      const array = Object.values(this.state);
      if (array.some((item) => item.length < TAMANHO)) {
        this.setState({ isEnterButtonDisabled: true });
      } else {
        this.setState({ isEnterButtonDisabled: false });
      }
    });
  }

  // função pega do stackoverflow para poder redirecionar uma página na outra quando clicar no botão de entrar.
  // https://pt.stackoverflow.com/questions/369892/como-redirecionar-para-uma-rota-usando-onclick-e-react-router
  handleButtonClick = async () => {
    this.setState({ isLoading: true });
    const { name } = this.state;
    await createUser({ name });
    this.setState({ isLoading: false, redirect: true });
  }

  render() {
    const { isEnterButtonDisabled, redirect, isLoading } = this.state;
    // https://pt.stackoverflow.com/questions/369892/como-redirecionar-para-uma-rota-usando-onclick-e-react-router sobre a função de redirecionar
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        {
          isLoading ? <Carregando /> : (
            <form>
              <label htmlFor="login">
                Login:
                <input
                  type="text"
                  name="login"
                  placeholder="Digite seu Nome"
                  data-testid="login-name-input"
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ isEnterButtonDisabled }
                onClick={ this.handleButtonClick }
              >
                Entrar
              </button>
            </form>
          )
        }
      </div>
    );
  }
}

export default Login;
