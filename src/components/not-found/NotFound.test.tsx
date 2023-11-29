import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import { App } from '../../App';
import { MemoryRouter } from 'react-router-dom';
import DetailedCard from '../item/DetailedCard';
import { renderWithProviders } from '../../test-utils';
import { setupStore } from '../../redux';

describe('Not found', () => {
  const store = setupStore();

  it('Renders Not found page for unknown url', () => {
    // Arrange
    renderWithProviders(
      <MemoryRouter initialEntries={['/not-found']}>
        <App />
      </MemoryRouter>,
      { store }
    );

    // Expect
    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toHaveTextContent('Not Found');
    expect(
      screen.getByText('Page or item you are requesting does not exist')
    ).toBeVisible();
  });

  it('Renders Not found page inside Details card if incorrect id is passed', () => {
    // Arrange
    renderWithProviders(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>,
      { store }
    );

    // Expect
    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toHaveTextContent('Not Found');
    expect(
      screen.getByText('Page or item you are requesting does not exist')
    ).toBeVisible();
  });
});
