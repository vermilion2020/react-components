import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App, WrappedApp } from './App';

describe('App tests', () => {
  it('Renders React Components the first level heading', () => {
    // Arrange
    render(<WrappedApp />);
    // Expect
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('React Components');
  });

  it('Renders Not Found page if it is not existing', () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={['/not-existing-url']}>
        <App />
      </MemoryRouter>
    );
    // Expect
    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toHaveTextContent('Not Found');
  });
});
