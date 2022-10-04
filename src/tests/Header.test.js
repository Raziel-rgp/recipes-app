import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  EMAIL_INPUT, VALID_EMAIL, PASSWORD_INPUT, VALID_PASSWORD, LOGIN_SUBMIT_BTN,
  PROFILE_TOP_BTN, SEARCH_TOP_BTN, SEARCH_INPUT,
} from './utils/constants';
import renderWithRouter from './utils/renderWithRouter';

describe('tests for component Header', () => {
  it('header must have a search button and a profile button', () => {
    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));

    expect(screen.getByTestId(PROFILE_TOP_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_TOP_BTN)).toBeInTheDocument();
  });

  it('when clicked on the profile icon, is redirected to profile page', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));

    userEvent.click(screen.getByTestId(PROFILE_TOP_BTN));
    expect(history.location.pathname).toBe('/profile');
  });

  it('search input appears when clicked on search icon, clicked again disappears', () => {
    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));

    expect(screen.queryByTestId(SEARCH_INPUT)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    expect(screen.queryByTestId(SEARCH_INPUT)).not.toBeInTheDocument();
  });
});
