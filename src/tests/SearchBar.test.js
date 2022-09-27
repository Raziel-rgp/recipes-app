import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  EMAIL_INPUT, VALID_EMAIL, PASSWORD_INPUT, VALID_PASSWORD, LOGIN_SUBMIT_BTN,
  SEARCH_TOP_BTN, SEARCH_INPUT, INGREDIENT_SEARCH_RADIO, NAME_SEARCH_RADIO,
  FIRST_LETTER_SEARCH_RADIO, EXEC_SEARCH_BTN, CHICKEN_INGREDIENT_URL, CHICKEN_NAME_URL,
  CHICKEN_FIRST_LETTER_URL,
} from './utils/contants';
import renderWithRouter from './utils/renderWithRouter';
import mockMealChicken from './utils/mockData';

describe('tests for component SearchBar', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMealChicken),
    }));
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));
    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
  });

  it('has search input, 3 inputs of the radio type and a search button', async () => {
    await waitFor(async () => {
      expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();
      expect(screen.getByTestId(INGREDIENT_SEARCH_RADIO)).toBeInTheDocument();
      expect(screen.getByTestId(NAME_SEARCH_RADIO)).toBeInTheDocument();
      expect(screen.getByTestId(FIRST_LETTER_SEARCH_RADIO)).toBeInTheDocument();
      expect(screen.getByTestId(EXEC_SEARCH_BTN)).toBeInTheDocument();
    });
  });

  it('when search input has chicken and ingredient selected, fetch the correct url', () => {
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'chicken');
    userEvent.click(screen.getByTestId(INGREDIENT_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    expect(fetch).toHaveBeenCalledWith(CHICKEN_INGREDIENT_URL);
  });

  it('when search input has chicken and name selected, fetch the correct url', () => {
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'chicken');
    userEvent.click(screen.getByTestId(NAME_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    expect(fetch).toHaveBeenCalledWith(CHICKEN_NAME_URL);
  });

  it('when search input has c and first letter selected, fetch the correct url', () => {
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'c');
    userEvent.click(screen.getByTestId(FIRST_LETTER_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    expect(fetch).toHaveBeenCalledWith(CHICKEN_FIRST_LETTER_URL);
  });

  it('when search input has chicken and first letter selected, show alert', () => {
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'chicken');
    userEvent.click(screen.getByTestId(FIRST_LETTER_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    expect(window.alert).toBeCalledWith('Your search must have only 1 (one) character');
  });

  it('when inputs are empty, show an alart', () => {
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
    expect(window.alert).toBeCalledWith('Fill in the fields');
  });
});