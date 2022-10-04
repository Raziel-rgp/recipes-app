import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  EMAIL_INPUT, INVALID_EMAIL, INVALID_PASSWORD, LOGIN_SUBMIT_BTN, PASSWORD_INPUT,
  VALID_EMAIL, VALID_PASSWORD,
} from './utils/constants';
import renderWithRouter from './utils/renderWithRouter';

describe('tests for Login page', () => {
  it('there is an email field, password and a login button', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId(EMAIL_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_SUBMIT_BTN)).toBeInTheDocument();
  });

  it('invalid email and invalid password the button is disabled', () => {
    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), INVALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), INVALID_PASSWORD);
    expect(screen.getByTestId(LOGIN_SUBMIT_BTN)).toBeDisabled();
  });

  it('valid email and valid password the button is disabled', () => {
    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    expect(screen.getByTestId(LOGIN_SUBMIT_BTN)).toBeEnabled();
  });

  it('when clicked on the login button it is redirected to "/meals"', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));

    expect(history.location.pathname).toBe('/meals');
  });
});
