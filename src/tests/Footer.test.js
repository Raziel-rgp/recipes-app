import { screen } from '@testing-library/react';
import App from '../App';
// import Footer from '../components/Footer';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes do Footer', () => {
  it('Aparecem os icones na tela', () => {
    renderWithRouter(<App />, '/');
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    expect(mealsIcon).toBeInTheDocument();
    expect(drinksIcon).toBeInTheDocument();
  });
});
