import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  FILTER_BY_ALL_BTN, FILTER_BY_MEAL_BTN, FILTER_BY_DRINK_BTN, HORIZONTAL_NAME_0,
  HORIZONTAL_NAME_1,
  UNFAVORITE_BTN_0,
  UNFAVORITE_BTN_1,
  HORIZONTAL_IMAGE_0,
} from './utils/constants';
import renderWithRouter from './utils/renderWithRouter';
import mockFavoriteRecipes from './mocks/mockFavoriteRecipes';

const favoriteRecipeLocation = '/favorite-recipes';

describe('tests for page FavoriteRecipes', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);

    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));
    history.push(favoriteRecipeLocation);
  });

  afterEach(() => localStorage.clear());

  test('Testing if the "all", "meal" and "drink" buttons exist', () => {
    expect(screen.getByTestId(FILTER_BY_ALL_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(FILTER_BY_MEAL_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(FILTER_BY_DRINK_BTN)).toBeInTheDocument();
  });
  test('renders a card about a done recipe with data-testid correct', async () => {
    await waitFor(() => {
      mockFavoriteRecipes.forEach((recipe, index) => {
        expect(screen.getByTestId(`${index}-horizontal-image`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-horizontal-top-text`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-horizontal-name`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-horizontal-share-btn`)).toBeInTheDocument();
      });
    });
  });

  test('renders a Meal and Drink card with the correct information', async () => {
    await waitFor(() => {
      mockFavoriteRecipes.forEach(
        (
          { image, type, nationality, category, name, alcoholicOrNot },
          index,
        ) => {
          const topText = (
            type === 'drink' ? alcoholicOrNot : `${nationality} - ${category}`);

          expect(screen.getByTestId(`${index}-horizontal-image`).src).toBe(image);
          expect(
            screen.getByTestId(`${index}-horizontal-top-text`).innerHTML,
          ).toBe(topText);
          expect(screen.getByTestId(`${index}-horizontal-name`).innerHTML).toBe(name);
        },
      );
    });
  });

  test('when click in filter by meal, drink or all, correct cards are rendered', async () => {
    await waitFor(() => {
      userEvent.click(screen.getByTestId(FILTER_BY_MEAL_BTN));
      expect(
        screen.getByTestId(HORIZONTAL_NAME_0).innerHTML,
      ).toBe(mockFavoriteRecipes[0].name);
      expect(screen.queryByTestId(HORIZONTAL_NAME_1)).not.toBeInTheDocument();

      userEvent.click(screen.getByTestId(FILTER_BY_DRINK_BTN));
      expect(
        screen.getByTestId(HORIZONTAL_NAME_0).innerHTML,
      ).toBe(mockFavoriteRecipes[1].name);
      expect(screen.queryByTestId(HORIZONTAL_NAME_1)).not.toBeInTheDocument();

      userEvent.click(screen.getByTestId(FILTER_BY_ALL_BTN));
      expect(
        screen.getByTestId(HORIZONTAL_NAME_0).innerHTML,
      ).toBe(mockFavoriteRecipes[0].name);
      expect(screen.queryByTestId(HORIZONTAL_NAME_1)).toBeInTheDocument();
    });
  });
  test('Testing the unfavorite button', () => {
    userEvent.click(screen.getByTestId(FILTER_BY_ALL_BTN));
    expect(screen.getByText(/FAVORITE RECIPES/i)).toBeInTheDocument();
    expect(
      screen.getByTestId(HORIZONTAL_NAME_0),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(HORIZONTAL_NAME_0),
    ).toHaveTextContent(mockFavoriteRecipes[0].name);
    expect(
      screen.getByTestId(HORIZONTAL_NAME_1),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(UNFAVORITE_BTN_0),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(UNFAVORITE_BTN_1),
    ).toBeInTheDocument();
    userEvent.click(
      screen.getByTestId(UNFAVORITE_BTN_1),
    );
    expect(
      screen.queryByTestId(HORIZONTAL_NAME_1),
    ).toBeNull();
  });
  test('Testing if the click in the name is working', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(favoriteRecipeLocation);
    await waitFor(() => {
      expect(screen.getByTestId(HORIZONTAL_NAME_0)).toBeInTheDocument();
      userEvent.click(screen.getByTestId(HORIZONTAL_NAME_0));
      expect(
        history.location.pathname,
      ).toBe(`/${mockFavoriteRecipes[0].type}s/${mockFavoriteRecipes[0].id}`);
    });
  });
  test('Testing if the click in the image is working', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(favoriteRecipeLocation);
    await waitFor(() => {
      expect(screen.getByTestId(HORIZONTAL_IMAGE_0)).toBeInTheDocument();
      userEvent.click(screen.getByTestId(HORIZONTAL_IMAGE_0));
      expect(
        history.location.pathname,
      ).toBe(`/${mockFavoriteRecipes[0].type}s/${mockFavoriteRecipes[0].id}`);
    });
  });
});
