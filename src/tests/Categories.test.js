import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  EMAIL_INPUT, VALID_EMAIL, PASSWORD_INPUT, VALID_PASSWORD, LOGIN_SUBMIT_BTN,
  DRINKS_BOTTOM_BTN, URL_CATEGORIES_MEALS, URL_CATEGORIES_DRINKS,
} from './utils/contants';
import renderWithRouter from './utils/renderWithRouter';
import mockMealsCategories from './mocks/mockMealsCategories';
import mockDrinksCategories from './mocks/mockDrinksCategories';

const MIN_LENGTH_CATEGORIES = 5;

describe('test for component Categories', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMealsCategories),
    }));

    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));
  });

  afterEach(() => jest.clearAllMocks());

  it('a fetch is made to get the meals categories', async () => {
    expect(fetch).toHaveBeenCalledWith(URL_CATEGORIES_MEALS);
    await waitFor(() => mockMealsCategories.meals.forEach(({ strCategory }, index) => {
      if (index < MIN_LENGTH_CATEGORIES) {
        expect(screen.getByTestId(`${strCategory}-category-filter`)).toBeInTheDocument();
      }
    }));
  });

  it('a fetch is made to get the drinks categories', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinksCategories),
    }));

    userEvent.click(screen.getByTestId(DRINKS_BOTTOM_BTN));

    expect(fetch).toHaveBeenCalledWith(URL_CATEGORIES_DRINKS);
    await waitFor(() => mockDrinksCategories.drinks.forEach(
      ({ strCategory: category }, index) => {
        if (index < MIN_LENGTH_CATEGORIES) {
          expect(screen.getByTestId(`${category}-category-filter`)).toBeInTheDocument();
        }
      },
    ));
  });
});
