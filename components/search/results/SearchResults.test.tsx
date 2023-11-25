import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResults from './SearchResults';
import { NO_ITEMS_MESSAGE } from '../../../config';
import { ITEMS } from '../../../model/test-items';
import { renderWithProviders } from '../../../test-utils';
import { EMPTY_LIST_RESPONSE, FETCH_LIST_RESPONSE } from '../../../mock';
import { mswServer } from '../../../setupTests';
import { setupStore } from '../../../redux';
import { setItems } from '../../../redux/features/searchSlice';

describe('Renders Search results section', () => {
  // Arrange
  const itemsCount = ITEMS.length;

  it('Search results list component renders the specified number of cards', async () => {
    // Arrange
    mswServer.use(FETCH_LIST_RESPONSE);
    const store = setupStore();
    store.dispatch(setItems(ITEMS));
    renderWithProviders(<SearchResults isLoading={false} />, { store });
    await waitFor(() => screen.getAllByTestId('card-item')[0], {
      timeout: 5000,
    });
    const itemCards = screen.getAllByTestId('card-item');

    // Expect
    expect(itemCards.length).toEqual(itemsCount);
  });

  it('No items message is shown when search results are empty', async () => {
    // Arrange
    mswServer.use(EMPTY_LIST_RESPONSE);
    renderWithProviders(<SearchResults isLoading={false} />);
    await waitFor(() => screen.getByText(NO_ITEMS_MESSAGE), { timeout: 5000 });

    // Expect
    expect(screen.getByText(NO_ITEMS_MESSAGE)).toBeVisible();
  });
});
