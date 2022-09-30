import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  RECIPE_PHOTO, RECIPE_TITLE, RECIPE_CATEGORY, SHARE_BTN, FAVORITE_BTN,
  INSTRUCTIONS, FINISH_RECIPE_BTN,
} from './utils/contants';
import renderWithRouter from './utils/renderWithRouter';
import oneMeal from './mocks/oneMeal';
import oneDrink from './mocks/oneDrink';

jest.setTimeout(30000);

describe('tests for page Recipe in Progress', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    const { history } = renderWithRouter(<App />);
    history.push('/meals/52771/in-progress');
  });

  it('there are elements of a meal recipe', async () => {
    // await waitFor(() => {
    //   expect(screen.getByTestId(RECIPE_PHOTO)).toBeInTheDocument();
    //   expect(screen.getByTestId(RECIPE_TITLE)).toBeInTheDocument();
    //   expect(screen.getByTestId(RECIPE_CATEGORY)).toBeInTheDocument();
    //   expect(screen.getByTestId(SHARE_BTN)).toBeInTheDocument();
    //   expect(screen.getByTestId(FAVORITE_BTN)).toBeInTheDocument();
    //   expect(screen.getByTestId(INSTRUCTIONS)).toBeInTheDocument();
    //   expect(screen.getByTestId(FINISH_RECIPE_BTN)).toBeInTheDocument();
    // });
  });
});
