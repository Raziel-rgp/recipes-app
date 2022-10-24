import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando Pagina Recipe', () => {
  test.only('Testando se os elementos são renderizados', async () => {
    renderWithRouter(<App />, '/meals');

    const cocoa = await screen.findByTestId('Cocoa-category-filter');
    expect(cocoa).toBeInTheDocument();
    // const buttons = await screen.findAllByRole('button', undefined, { timeout: 15000 });
    // const clearAllFilters = await screen.findByTestId('All-category-filter');
    // const imgs = await screen.findAllByRole('img', undefined, { timeout: 5000 });
    // expect(buttons.length).toBe(6);
    // expect(clearAllFilters).toBeInTheDocument();
    // expect(imgs.length).toBe(25);
  });

  test('Testando se os elementos são renderizados', async () => {
    renderWithRouter(<App />, '/drinks');

    const clearAllFilters = await screen.findByTestId('All-category-filter');
    // const imgs = await screen.findAllByRole('img', undefined, { timeout: 5000 });

    expect(clearAllFilters).toBeInTheDocument();
    // expect(imgs.length).toBe(25);
  });
});
