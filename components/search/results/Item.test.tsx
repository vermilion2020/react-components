import React from 'react';
import { describe, it, vi } from 'vitest';
import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import Item from './Item';
import { ITEMS } from '../../../model/test-items';
import { EMPTY_LIST_RESPONSE, FETCH_ITEM_RESPONSE } from '../../../mock';
import { mswServer } from '../../../setupTests';
import { renderWithProviders } from '../../../test-utils';
import { setupStore } from '../../../redux';
import { setLoading } from '../../../redux/features/searchSlice';
import SearchResults from './SearchResults';

describe('Item card tests', () => {
  // Arrange
  const item = ITEMS[0];

  it('Validate that clicking on a card opens a detailed card component', async () => {
    // Arrange
    const store = setupStore();
    store.dispatch(setLoading(false));
    await act(async () => {
      renderWithProviders(<SearchResults isLoading={false} items={ITEMS} />, {
        store,
      });
    });
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
    mswServer.use(EMPTY_LIST_RESPONSE);
    const store = setupStore();
    const { requestSpy } = vi.hoisted(() => {
      return { requestSpy: vi.fn() };
    });
    //store.dispatch(setPage(page));

    renderWithProviders(<SearchResults isLoading={false} items={ITEMS} />, {
      store,
    });

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
    const store = setupStore();

    renderWithProviders(<Item item={ITEMS[0]} />, { store });

    // Expect
    expect(screen.getByText(item.name)).toBeVisible();
    expect(screen.getByText(item.tagline)).toBeVisible();
    expect(screen.getByRole('img')).toBeVisible();
  });
});
