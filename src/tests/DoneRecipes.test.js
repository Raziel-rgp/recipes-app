import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Done Recipes', () => {
  it.only('Continue Recipe', async () => {
    renderWithRouter(<App />, '/drinks/15288');
    const btnStartRecipe = await screen.findByTestId('start-recipe-btn');
    userEvent.click(btnStartRecipe);
    const checkboxes = await screen.findAllByRole('checkbox');
    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    const finishBtn = screen.getByText('Finish Recipe');
    userEvent.click(finishBtn);
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    const drinksBtn = screen.getByTestId('filter-by-drink-btn');
    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
    const image = await screen.findByTestId('0-horizontal-image');
    const name = await screen.findByTestId('0-horizontal-name');
    const type = await screen.findByTestId('0-horizontal-top-text');
    const date = await screen.findByTestId('0-horizontal-done-date');
    const tag = await screen.findByTestId('0-horizontal-tag');
    const button = await screen.findByTestId('0-horizontal-share-btn');
    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
