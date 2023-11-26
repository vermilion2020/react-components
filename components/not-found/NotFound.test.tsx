import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import DetailedCard from '../item/DetailedCard';
import { renderWithProviders } from '../../test-utils';
import { setupStore } from '../../redux';
import NotFound from '../../pages/404';
import React from 'react';

describe('Not found', () => {
  const store = setupStore();

  it('Renders Not found page correctly', () => {
    // Arrange
    renderWithProviders(<NotFound />, { store });

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
    renderWithProviders(<DetailedCard />, { store });

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
