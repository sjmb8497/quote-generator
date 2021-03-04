import { render, screen } from '@testing-library/react';
import App from './App';

test('renders extension title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Quote generator/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders button text', () => {
  render(<App />);
  const button = screen.getByText(/New quote/i);
  expect(button).toBeInTheDocument();
});
