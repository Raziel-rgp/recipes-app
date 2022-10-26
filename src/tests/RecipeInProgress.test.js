import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando a pagina detalhada das receitas', () => {
  it('Testando se os elementos sao renderizados na pagina de drinks', async () => {
    renderWithRouter(<App />, '/meals/52977/in-progress');

    const img = await screen.findByTestId('recipe-photo');
    const tilte = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');
    const ingredient = await screen.findByTestId('0-ingredient-step');
    const btnFavorite = await screen.findByTestId('favorite-btn');
    const btnShare = await screen.findByTestId('share-btn');
    // const recomendation = await screen.findByTestId('0-recommendation-card', undefined, { timeout: 2000 });
    const instructions = await screen.findByTestId('instructions');
    const checks = await screen.findAllByRole('checkbox');

    expect(img).toBeInTheDocument();
    expect(tilte).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(checks.length).toBe(13);
  });
});
