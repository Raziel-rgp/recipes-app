import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando Pagina Recipe', () => {
  test.only('Testando se os elementos são renderizados', async () => {
    renderWithRouter(<App />, '/meals');

    const buttons = await screen.findAllByRole('button', undefined, { timeout: 2000 });
    const imgs = await screen.findAllByRole('img', undefined, { timeout: 2000 });

    expect(buttons.length).toBe(5);
    expect(imgs.length).toBe(12);
  });
});
