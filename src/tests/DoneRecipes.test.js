import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import copy from 'clipboard-copy';
import App from '../App';
import {
  FILTER_BY_ALL_BTN, FILTER_BY_MEAL_BTN, FILTER_BY_DRINK_BTN, HORIZONTAL_NAME_0,
  HORIZONTAL_NAME_1,
} from './utils/contants';
import renderWithRouter from './utils/renderWithRouter';
import mockDoneRecipes from './mocks/mockDoneRecipes';

jest.mock('clipboard-copy');

describe('tests for page DoneRecipes', () => {
  beforeEach(() => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    const { history } = renderWithRouter(<App />);

    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    history.push('/done-recipes');
  });

  afterEach(() => localStorage.clear());

  it('there are three filters, one to filter by Meal, Drinsk and All', () => {
    expect(screen.getByTestId(FILTER_BY_ALL_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(FILTER_BY_MEAL_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(FILTER_BY_DRINK_BTN)).toBeInTheDocument();
  });

  it('renders a card about a done recipe with data-testid correct', async () => {
    await waitFor(() => {
      mockDoneRecipes.forEach(({ tags }, index) => {
        expect(screen.getByTestId(`${index}-horizontal-image`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-horizontal-top-text`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-horizontal-name`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-horizontal-done-date`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-horizontal-share-btn`)).toBeInTheDocument();
        tags.forEach((tag) => {
          expect(
            screen.getByTestId(`${index}-${tag}-horizontal-tag`),
          ).toBeInTheDocument();
        });
      });
    });
  });

  it('renders a Meal and Drink card with the correct information', async () => {
    await waitFor(() => {
      mockDoneRecipes.forEach(
        (
          { image, nationality, category, name, doneDate, tags, alcoholicOrNot },
          index,
        ) => {
          const topText = `${
            alcoholicOrNot.length ? alcoholicOrNot : nationality
          } - ${category}`;

          expect(screen.getByTestId(`${index}-horizontal-image`).src).toBe(image);
          expect(
            screen.getByTestId(`${index}-horizontal-top-text`).innerHTML,
          ).toBe(topText);
          expect(screen.getByTestId(`${index}-horizontal-name`).innerHTML).toBe(name);
          expect(
            screen.getByTestId(`${index}-horizontal-done-date`).innerHTML,
          ).toBe(doneDate);
          tags.forEach((tag) => {
            expect(
              screen.getByTestId(`${index}-${tag}-horizontal-tag`).innerHTML,
            ).toBe(tag);
          });
        },
      );
    });
  });

  it('when click in shared button, the details recipe is copy to clipboard', async () => {
    userEvent.click(await screen.findByTestId('0-horizontal-share-btn'));

    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
    expect(copy).toBeCalledWith('http://localhost/meals/52771');
    await waitFor(() => expect(screen.queryByText(/link copied!/i)).not.toBeInTheDocument(), { timeout: 3000 });

    userEvent.click(await screen.findByTestId('1-horizontal-share-btn'));
    expect(copy).toBeCalledWith('http://localhost/drinks/178319');
    expect(copy).toBeCalledTimes(2);
  });

  it('when click in filter by meal, drink or all, correct cards are rendered', async () => {
    await waitFor(() => {
      userEvent.click(screen.getByTestId(FILTER_BY_MEAL_BTN));
      expect(
        screen.getByTestId(HORIZONTAL_NAME_0).innerHTML,
      ).toBe(mockDoneRecipes[0].name);
      expect(screen.queryByTestId(HORIZONTAL_NAME_1)).not.toBeInTheDocument();

      userEvent.click(screen.getByTestId(FILTER_BY_DRINK_BTN));
      expect(
        screen.getByTestId(HORIZONTAL_NAME_0).innerHTML,
      ).toBe(mockDoneRecipes[1].name);
      expect(screen.queryByTestId(HORIZONTAL_NAME_1)).not.toBeInTheDocument();

      userEvent.click(screen.getByTestId(FILTER_BY_ALL_BTN));
      expect(
        screen.getByTestId(HORIZONTAL_NAME_0).innerHTML,
      ).toBe(mockDoneRecipes[0].name);
      expect(screen.queryByTestId(HORIZONTAL_NAME_1)).toBeInTheDocument();
    });
  });
});
