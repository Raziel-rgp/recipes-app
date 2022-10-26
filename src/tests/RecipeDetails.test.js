import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando a pagina detalhada das receitas', () => {
  it('Testando se os elementos sao renderizados na pagina de meals', async () => {
    const { history } = renderWithRouter(<App />, '/meals/53060');

    const img = await screen.findByTestId('recipe-photo');
    const tilte = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');
    const ingredient = await screen.findByTestId('0-ingredient-name-and-measure');
    const btnFavorite = await screen.findByTestId('favorite-btn');
    const btnShare = await screen.findByTestId('share-btn');
    const iframeVideo = await screen.findByTestId('video');
    const recomendation = await screen.findByTestId('0-recommendation-card', undefined, { timeout: 2000 });
    const btnStartRecipe = await screen.findByTestId('start-recipe-btn');

    expect(img).toBeInTheDocument();
    expect(tilte).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();
    expect(iframeVideo).toBeInTheDocument();
    expect(recomendation).toBeInTheDocument();

    userEvent.click(btnFavorite);
    userEvent.click(btnFavorite);
    userEvent.click(btnShare);

    const msgCopiedSucess = await screen.findByTestId('msg_copy_sucess');
    expect(msgCopiedSucess).toBeInTheDocument();

    userEvent.click(btnStartRecipe);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/53060/in-progress');
  });

  it('Testando se os elementos sao renderizados na pagina de drinks', async () => {
    const { history } = renderWithRouter(<App />, '/drinks/15997');

    const img = await screen.findByTestId('recipe-photo');
    const tilte = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');
    const ingredient = await screen.findByTestId('0-ingredient-name-and-measure');
    const btnFavorite = await screen.findByTestId('favorite-btn');
    const btnShare = await screen.findByTestId('share-btn');
    const recomendation = await screen.findByTestId('0-recommendation-card', undefined, { timeout: 2000 });
    const btnStartRecipe = await screen.findByTestId('start-recipe-btn');
    const btnContinue = screen.queryByRole('button', {
      name: /continue recipe/i,
    });

    expect(img).toBeInTheDocument();
    expect(tilte).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();
    expect(recomendation).toBeInTheDocument();
    expect(btnStartRecipe).toBeInTheDocument();
    expect(btnContinue).not.toBeInTheDocument();

    userEvent.click(btnShare);

    const msgCopiedSucess = await screen.findByTestId('msg_copy_sucess');
    expect(msgCopiedSucess).toBeInTheDocument();

    userEvent.click(btnFavorite);
    userEvent.click(btnFavorite);
    userEvent.click(btnStartRecipe);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/15997/in-progress');
  });
});
