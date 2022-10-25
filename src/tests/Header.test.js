import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import Header from '../components/Header';

describe('Testando Header', () => {
  test('Testa se o header é renderizado', () => {
    const { history } = renderWithRouter(<Header />, '/drinks');

    const btnProfile = screen.getByTestId('profile-top-btn');
    const title = screen.getByTestId('page-title');

    expect(btnProfile).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    userEvent.click(btnProfile);
    expect(history.location.pathname).toBe('/profile');
  });

  test('Testando botão de pesquisa', () => {
    renderWithRouter(<Header />, '/drinks');
    const btnSearch = screen.getByAltText(/Icone de pesquisa/i);
    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId('search-input');
    userEvent.click(btnSearch);
    expect(searchInput).not.toBeInTheDocument();
  });

  test('Testando rota profile', () => {
    renderWithRouter(<Header />, '/profile');
    const profileName = screen.getByTestId('page-title');
    const profileIcon = screen.getByTestId('profile-top-btn');

    expect(profileName).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
  });

  test('Testando rota done-recipes', () => {
    renderWithRouter(<Header />, '/done-recipes');
    const profileName = screen.getByRole('heading', {
      level: 2,
    });
    const profileIcon = screen.getByAltText(/Icone de perfil/i);

    expect(profileName).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
  });

  test('Testando rota favorite-recipes', () => {
    renderWithRouter(<Header />, '/favorite-recipes');
    const profileName = screen.getByRole('heading', {
      level: 2,
    });
    const profileIcon = screen.getByAltText(/Icone de perfil/i);

    expect(profileName).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
  });
});
