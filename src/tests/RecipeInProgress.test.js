import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  // RECIPE_PHOTO, RECIPE_TITLE, RECIPE_CATEGORY, SHARE_BTN, FAVORITE_BTN,
  EMAIL_INPUT, VALID_EMAIL, PASSWORD_INPUT, VALID_PASSWORD, LOGIN_SUBMIT_BTN,
  // INSTRUCTIONS, FINISH_RECIPE_BTN,
} from './utils/contants';
import renderWithRouter from './utils/renderWithRouter';
import oneMeal from './mocks/oneMeal';
import meals from './mocks/meals';
// import oneDrink from './mocks/oneDrink';

jest.setTimeout(30000);

describe('tests for page Recipe in Progress', () => {
  describe('for Meals', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(meals),
      }));

      renderWithRouter(<App />);

      userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
      userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
      userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));
    });

    it('', async () => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(oneMeal),
      }));

      userEvent.click(await screen.findByTestId('0-recipe-card'));
      userEvent.click(await screen.findByTestId('start-recipe-btn'));

      // expect(await screen.findByTestId(RECIPE_PHOTO)).not.toBeInTheDocument();
    });
  });

  // it('there are elements of a meal recipe', async () => {
  // await waitFor(() => {
  //   expect(screen.getByTestId(RECIPE_PHOTO)).toBeInTheDocument();
  //   expect(screen.getByTestId(RECIPE_TITLE)).toBeInTheDocument();
  //   expect(screen.getByTestId(RECIPE_CATEGORY)).toBeInTheDocument();
  //   expect(screen.getByTestId(SHARE_BTN)).toBeInTheDocument();
  //   expect(screen.getByTestId(FAVORITE_BTN)).toBeInTheDocument();
  //   expect(screen.getByTestId(INSTRUCTIONS)).toBeInTheDocument();
  //   expect(screen.getByTestId(FINISH_RECIPE_BTN)).toBeInTheDocument();
  // });
  // });
});
