import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  RECIPE_PHOTO, RECIPE_TITLE, RECIPE_CATEGORY, SHARE_BTN, FAVORITE_BTN,
  INSTRUCTIONS, FINISH_RECIPE_BTN, ONE_DRINK_INGREDIENTS, BLACK_HEART_ICON,
  WHITE_HEART_ICON, ONE_MEAL_INGREDIENTS,
} from './utils/constants';
import renderWithRouter from './utils/renderWithRouter';
import oneMeal from './mocks/oneMeal';
import oneDrink from './mocks/oneDrink';

describe('tests for page Recipe in Progress', () => {
  afterEach(() => jest.resetAllMocks());

  describe('for Meal', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(oneMeal),
      }));

      const { history } = renderWithRouter(<App />);
      history.push('/meals/52977/in-progress');
    });

    it('there are elements of a meal recipe', async () => {
      await waitFor(() => {
        expect(screen.getByTestId(RECIPE_PHOTO)).toBeInTheDocument();
        expect(screen.getByTestId(RECIPE_TITLE)).toBeInTheDocument();
        expect(screen.getByTestId(RECIPE_CATEGORY)).toBeInTheDocument();
        expect(screen.getByTestId(SHARE_BTN)).toBeInTheDocument();
        expect(screen.getByTestId(FAVORITE_BTN)).toBeInTheDocument();
        expect(screen.getByTestId(INSTRUCTIONS)).toBeInTheDocument();
        expect(screen.getByTestId(FINISH_RECIPE_BTN)).toBeInTheDocument();
      });
    });

    it('is possible to favorite and unfavor the food', async () => {
      await waitFor(() => {
        const favoriteBtn = screen.getByTestId(FAVORITE_BTN);
        userEvent.click(favoriteBtn);
        expect(favoriteBtn.src).toBe(BLACK_HEART_ICON);
        userEvent.click(favoriteBtn);
        expect(favoriteBtn.src).toBe(WHITE_HEART_ICON);
      });
    });

    it('when all ingredients are checked, the finish button is enabled', async () => {
      const finishBtn = await screen.findByTestId(FINISH_RECIPE_BTN);
      expect(finishBtn).toBeDisabled();
      ONE_MEAL_INGREDIENTS.forEach((_, index) => {
        userEvent.click(screen.getByTestId(`${index}-ingredient-step`));
      });
      expect(finishBtn).toBeEnabled();
      userEvent.click(finishBtn);
    });
  });

  describe('for Drink', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(oneDrink),
      }));

      const { history } = renderWithRouter(<App />);
      history.push('/drinks/178319/in-progress');
    });

    it('there are checkboxes for each drink ingredient', async () => {
      await waitFor(() => {
        ONE_DRINK_INGREDIENTS.forEach((_, index) => {
          expect(screen.getByTestId(`${index}-ingredient-step`)).toBeInTheDocument();
        });
      });
    });

    it('is possible to favorite and unfavor the drink', async () => {
      await waitFor(() => {
        userEvent.click(screen.getByTestId(FAVORITE_BTN));
        expect(screen.getByTestId(FAVORITE_BTN).src).toBe(BLACK_HEART_ICON);
        userEvent.click(screen.getByTestId(FAVORITE_BTN));
        expect(screen.getByTestId(FAVORITE_BTN).src).toBe(WHITE_HEART_ICON);
      });
    });
  });
});
