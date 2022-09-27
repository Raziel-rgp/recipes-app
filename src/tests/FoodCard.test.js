import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  EMAIL_INPUT, VALID_EMAIL, PASSWORD_INPUT, VALID_PASSWORD, LOGIN_SUBMIT_BTN,
  DRINKS_BOTTOM_BTN,
} from './utils/contants';
import renderWithRouter from './utils/renderWithRouter';
import mockDrinks from './mocks/mockDrinks';
import mockMeals from './mocks/mockMeals';

const MAX_LEGTH_CARDS = 12;

describe('tests for component FoodCard', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMeals),
    }));

    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));
  });

  afterEach(() => jest.clearAllMocks());

  it('in the page Meals, has 12 cards with div, images and texts about food', async () => {
    await waitFor(() => mockMeals.meals.forEach(({ strMealThumb, strMeal }, index) => {
      if (index < MAX_LEGTH_CARDS) {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-img`).src).toBe(strMealThumb);
        expect(screen.getByTestId(`${index}-card-name`).innerHTML).toBe(strMeal);
      }
    }));
  });

  it('in the page Drinks, has 12 cards with div, images and texts about food', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinks),
    }));

    userEvent.click(screen.getByTestId(DRINKS_BOTTOM_BTN));

    await waitFor(() => mockDrinks.drinks.forEach(
      ({ strDrinkThumb, strDrink }, index) => {
        if (index < MAX_LEGTH_CARDS) {
          expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
          expect(screen.getByTestId(`${index}-card-img`).src).toBe(strDrinkThumb);
          expect(screen.getByTestId(`${index}-card-name`).innerHTML).toBe(strDrink);
        }
      },
    ));
  });
});
