import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Login from '../pages/Login';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const btnLogin = 'login-submit-btn';
const passwordInput = 'password-input';
const emailInput = 'email-input';

describe('Testes para a Tela de Login', () => {
  test('Testa se o input e-mail aparece', () => {
    renderWithRouter(<App />, '/');
    const input = screen.getByTestId(emailInput);
    expect(input).toBeInTheDocument();
  });

  test('Testa se o input senha aparece', () => {
    renderWithRouter(<App />, '/');
    const input = screen.getByTestId(passwordInput);
    expect(input).toBeInTheDocument();
  });

  test('Testa se o botão aparece', () => {
    renderWithRouter(<App />, '/');
    const button = screen.getByTestId(btnLogin);
    expect(button).toBeInTheDocument();
  });

  test('Testa se o botão está desabilitado', () => {
    renderWithRouter(<App />, '/');

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const button = screen.getByTestId(btnLogin);

    const textInput = 'teste';
    const numberInput = '1234';

    userEvent.type(email, textInput);
    userEvent.type(password, numberInput);

    expect(button).toBeDisabled();
  });

  test('Testa se o botão é habilitado', () => {
    const { history } = renderWithRouter(<App />, '/');

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const button = screen.getByTestId(btnLogin);
    const textInput = 'teste@teste.com';
    const numberInput = '1234567';

    userEvent.type(email, textInput);
    userEvent.type(password, numberInput);
    userEvent.click(button);

    expect(history.location.pathname).toBe('/meals');
    expect(button).not.toBeDisabled();
  });
});
