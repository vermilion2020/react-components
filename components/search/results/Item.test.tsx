import React from 'react';
import { describe, it, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Item from './Item';
import { ITEMS } from '../../../model/test-items';
import { FETCH_ITEM_RESPONSE, FETCH_LIST_RESPONSE } from '../../../mock';
import { mswServer } from '../../../setupTests';
import { renderWithProviders } from '../../../test-utils';
import { setupStore } from '../../../redux';
import SearchResults from './SearchResults';
import { setItems, setLoading } from '../../../redux/features/searchSlice';

describe('Item card tests', () => {
  // Arrange
  const item = ITEMS[0];
  const store = setupStore();

  it('Validate that clicking on a card opens a detailed card component', async () => {
    // Arrange
    mswServer.use(FETCH_LIST_RESPONSE);
    store.dispatch(setItems(ITEMS));
    store.dispatch(setLoading(false));
    renderWithProviders(<SearchResults isLoading={false} />, { store });
    // Act
    await waitFor(() => screen.getAllByTestId('card-item')[0], {
      timeout: 5000,
    });
    mswServer.use(FETCH_ITEM_RESPONSE);
    fireEvent.click(screen.getAllByTestId('card-item')[0]);

    // Expect
    await waitFor(() => screen.getByTestId('item-profile'), { timeout: 5000 });
    expect(screen.getByTestId('item-profile')).toBeVisible();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    // Arrange
    mswServer.use(FETCH_LIST_RESPONSE);
    const { requestSpy } = vi.hoisted(() => {
      return { requestSpy: vi.fn() };
    });

    renderWithProviders(<SearchResults isLoading={false} />, { store });

    // Act
    await waitFor(() => screen.getAllByTestId('card-item')[0], {
      timeout: 5000,
    });
    mswServer.use(FETCH_ITEM_RESPONSE);
    mswServer.events.on('request:start', requestSpy.call('1'));
    fireEvent.click(screen.getAllByTestId('card-item')[0]);

    // Expect
    expect(requestSpy).toHaveBeenCalled();
  });

  it('Card component renders the relevant card data', () => {
    // Arrange

    renderWithProviders(<Item item={ITEMS[0]} />, { store });

    // Expect
    expect(screen.getByText(item.name)).toBeVisible();
    expect(screen.getByText(item.tagline)).toBeVisible();
    expect(screen.getByRole('img')).toBeVisible();
  });
});
