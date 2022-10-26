import React from 'react';
import { screen } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const strAllCategoryFilter = 'All-category-filter';

describe('Testando Pagina Recipe', () => {
  test('Testando se os elementos são renderizados na pagina de drinks', async () => {
    renderWithRouter(<App />, '/drinks');

    const img = await screen.findByTestId('0-card-img', undefined, { timeout: 2000 });
    const buttonCocktail = await screen.findByRole('button', {
      name: /cocktail/i,
    }, { timeout: 2000 });
    const buttons = await screen.findAllByRole('button', undefined, { timeout: 2000 });
    const clearAllFilters = await screen.findByTestId(strAllCategoryFilter);

    expect(clearAllFilters).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(buttonCocktail).toBeInTheDocument();
    expect(buttons.length).toBe(7);
  });

  test('Testando se os elementos são renderizados na pagina de meals', async () => {
    renderWithRouter(<App />, '/meals');

    const img = await screen.findByTestId('0-card-img', undefined, { timeout: 3000 });
    const buttonCocktail = await screen.findByRole('button', {
      name: /beef/i,
    }, { timeout: 3000 });
    const buttons = await screen.findAllByRole('button', undefined, { timeout: 3000 });
    const clearAllFilters = await screen.findByTestId(strAllCategoryFilter);

    expect(clearAllFilters).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(buttonCocktail).toBeInTheDocument();
    expect(buttons.length).toBe(7);
  });

  test('Testando se os elementos são renderizados na pagina de meals', async () => {
    renderWithRouter(<App />, '/meals');

    const btnFilterBeef = await screen.findByTestId('Beef-category-filter', undefined, { timeout: 3000 });

    const btnAll = screen.getByRole('button', {
      name: /All/i,
    });

    expect(btnFilterBeef).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();

    useEvent.click(btnFilterBeef);

    wait(1000);

    useEvent.click(btnFilterBeef);

    wait(500);

    useEvent.click(btnAll);
  });

  test('Testando se os elementos são renderizados na pagina de drinks', async () => {
    renderWithRouter(<App />, '/drinks');

    const btnFilterShake = await screen.findByTestId('Shake-category-filter', undefined, { timeout: 3000 });

    const btnAll = screen.getByRole('button', {
      name: /All/i,
    });

    expect(btnFilterShake).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();

    useEvent.click(btnFilterShake);

    wait(1000);

    useEvent.click(btnFilterShake);

    wait(500);

    useEvent.click(btnAll);
  });

  test('Testando se o usario na pagina de drinks é redirecionado ao clicar em algum card', async () => {
    const { history } = renderWithRouter(<App />, '/drinks');

    const cardDrink = await screen.findByTestId('0-recipe-card', undefined, { timeout: 3000 });

    expect(cardDrink).toBeInTheDocument();

    useEvent.click(cardDrink);

    const { pathname } = history.location;

    expect(pathname).toBe('/drinks/15997');
  });

  test('Testando se o usario na pagina de meals é redirecionado ao clicar em algum card', async () => {
    const { history } = renderWithRouter(<App />, '/meals');

    const cardDrink = await screen.findByTestId('0-recipe-card', undefined, { timeout: 3000 });

    expect(cardDrink).toBeInTheDocument();

    useEvent.click(cardDrink);

    const { pathname } = history.location;

    expect(pathname).toBe('/meals/52977');
  });
});
