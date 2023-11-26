import { describe, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import DetailedCard from './DetailedCard';
import { ITEMS } from '../../model/test-items';
import { FETCH_ITEM_RESPONSE } from '../../mock';
import { renderWithProviders } from '../../test-utils';
import { mswServer } from '../../setupTests';
import { setupStore } from '../../redux';
import { setItem, setLoading } from '../../redux/features/detailSlice';
import * as search from '../../redux/features/searchSlice';
import React from 'react';

describe('Detailed Card tests', () => {
  mswServer.use(FETCH_ITEM_RESPONSE);

  it('Preloader is displayed while fetching data', () => {
    // Arrange
    const store = setupStore();
    store.dispatch(setLoading(true));
    renderWithProviders(<DetailedCard />, { store });

    // Expect
    expect(screen.getByTestId('preloader')).toBeVisible();
  });

  it('Detailed card component correctly displays the detailed card data', async () => {
    // Arrange
    const item = ITEMS[0];
    mswServer.use(FETCH_ITEM_RESPONSE);

    const store = setupStore();
    store.dispatch(setItem(item));
    store.dispatch(search.setDetails(item.id));
    store.dispatch(setLoading(false));

    renderWithProviders(<DetailedCard />, { store });

    await waitFor(() => screen.getByTestId('item-profile'), {
      timeout: 5000,
    });

    // Expect
    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toHaveTextContent(item.name);
    expect(screen.getByText(item.tagline)).toBeVisible();
    expect(screen.getByText(item.description)).toBeVisible();
    expect(screen.getByText(item.brewers_tips)).toBeVisible();
    item.food_pairing.forEach((item) => {
      expect(screen.getByText(item)).toBeVisible();
    });
  });
});
