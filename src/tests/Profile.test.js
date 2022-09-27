import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import Profile from '../pages/Profile';
import {
  EMAIL_INPUT, PASSWORD_INPUT, VALID_EMAIL,
  VALID_PASSWORD, LOGIN_SUBMIT_BTN, PROFILE_TOP_BTN,
  PROFILE_USER_EMAIL, PROFILE_DONE_RECIPES_BTN,
  PROFILE_FAVORITE_RECIPES_BTN, PROFILE_LOGOUT_BTN,
} from './utils/contants';

describe('Tests of Profile', () => {
  test('if on click the button "Profile" the Route is "/profile"', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));

    userEvent.click(screen.getByTestId(PROFILE_TOP_BTN));
    expect(history.location.pathname).toBe('/profile');
  });
  test('Test if the user email is on the document', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));

    userEvent.click(screen.getByTestId(PROFILE_TOP_BTN));
    expect(history.location.pathname).toBe('/profile');

    expect(screen.getByTestId(PROFILE_USER_EMAIL)).toHaveTextContent(VALID_EMAIL);
  });
  test('Test if the Done Recipes redirect the page to "/done-recipes"', () => {
    const { history } = renderWithRouter(<Profile />);
    expect(screen.getByTestId(PROFILE_DONE_RECIPES_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(PROFILE_DONE_RECIPES_BTN));
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('Test if the Favorite Recipes redirect the page to "/favorite-recipes"', () => {
    const { history } = renderWithRouter(<Profile />);
    expect(screen.getByTestId(PROFILE_FAVORITE_RECIPES_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(PROFILE_FAVORITE_RECIPES_BTN));
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('Test if the Logout redirect the page to "/"', () => {
    const { history } = renderWithRouter(<Profile />);
    expect(screen.getByTestId(PROFILE_LOGOUT_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(PROFILE_LOGOUT_BTN));
    expect(history.location.pathname).toBe('/');
  });
});
