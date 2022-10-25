import React from 'react';
import { screen } from '@testing-library/react';
// import useEvent from '@testing-library/user-event';
// import { wait } from '@testing-library/user-event/dist/utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando a pagina detalhada das receitas', () => {
  it('Testando se os elementos sao renderizados na pagina de meals', async () => {
    renderWithRouter(<App />, '/meals/53060');

    const img = await screen.findByTestId('recipe-photo');
    const tilte = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');
    const ingredient = await screen.findByTestId('0-ingredient-name-and-measure');

    expect(img).toBeInTheDocument();
    expect(tilte).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
  });
});
