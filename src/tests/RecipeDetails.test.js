import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import oneDrink from './mocks/oneDrink';
import { RECIPE_PHOTO, RECIPE_TITLE, RECIPE_CATEGORY, SHARE_BTN,
  FAVORITE_BTN, FINISH_RECIPE_BTN,
} from './utils/constants';

describe('', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));

    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319');
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('The screen should have an image of the recipe, the title, the category in case of food and whether or not it is alcoholic in case of drinks, a list of ingredients followed by amounts, instructions, a "embedado" youtube video and recommendations', async () => {
    const drink = oneDrink.drinks[0];
    await waitFor(() => {
      expect(screen.getByTestId(RECIPE_PHOTO).src).toBe(drink.strDrinkThumb);
      expect(screen.getByTestId(RECIPE_TITLE).innerHTML).toBe(drink.strDrink);
      expect(screen.getByTestId(RECIPE_CATEGORY).innerHTML).toBe(drink.strAlcoholic);
      expect(screen.getByTestId(SHARE_BTN)).toBeInTheDocument();
      expect(screen.getByTestId(FAVORITE_BTN)).toBeInTheDocument();
    });
  });

  it('when click in start button is to redirect to page in-progress', async () => {
    userEvent.click(await screen.findByTestId('start-recipe-btn'));
    expect(await screen.findByTestId(FINISH_RECIPE_BTN)).toBeInTheDocument();
  });
});
