import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../tests/utils/renderWithRouter'
import { creatMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Footer from '../components/Footer';
import Meals from '../pages/Meals';

describe('Tests of Footer', () => {
  test('1- test if testIds exist in the document', () => {
    render(<Footer />)
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
  });
  test('2- test if on click the button "drinks" the Route is "/drinks"', () => {
    const { history } = renderWithRouter(<Meals />)
    const button = screen.getByAltText( "drinks" );
    userEvent.click(button)
    expect(history.location.pathname).toBe('/drinks');
  });
  test('3- test if on click the button "drinks" the Route is "/Meals"', () => {
    const { history } = renderWithRouter(<Meals />)
    const button = screen.getByAltText( "meals" );
    userEvent.click(button)
    expect(history.location.pathname).toBe('/meals');
  });
});