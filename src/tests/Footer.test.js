import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import Footer from '../components/Footer';
import App from '../App';
import {
  DRINKS_BOTTOM_BTN, MEALS_BOTTOM_BTN, EMAIL_INPUT, PASSWORD_INPUT, VALID_EMAIL,
  VALID_PASSWORD, LOGIN_SUBMIT_BTN,
} from './utils/contants';

describe('Tests of Footer', () => {
  it('if testIds exist in the document', () => {
    render(<Footer />);

    expect(screen.getByTestId(DRINKS_BOTTOM_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(MEALS_BOTTOM_BTN)).toBeInTheDocument();
  });

  it('if on click the button "drinks" the Route is "/drinks"', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));

    userEvent.click(screen.getByTestId(DRINKS_BOTTOM_BTN));
    expect(history.location.pathname).toBe('/drinks');
  });

  it('if on click the button "drinks" the Route is "/Meals"', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));

    userEvent.click(screen.getByTestId(MEALS_BOTTOM_BTN));
    expect(history.location.pathname).toBe('/meals');
  });
});
