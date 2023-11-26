import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NO_ITEMS_MESSAGE } from '../../config';
import { ITEMS } from '../../model/test-items';
import { renderWithProviders } from '../../test-utils';
import { EMPTY_LIST_RESPONSE } from '../../mock';
import { mswServer } from '../../setupTests';
import { setupStore } from '../../redux';
import SearchContainer from './SearchContainer';
import { setItem } from '../../redux/features/detailSlice';
import { setDetails } from '../../redux/features/searchSlice';

describe('Renders Search Container component', () => {
  // Arrange
  const store = setupStore();
  const itemsCount = ITEMS.length;
  mswServer.use(EMPTY_LIST_RESPONSE);

  it('Search container component renders the specified number of cards', async () => {
    // Arrange
    renderWithProviders(<SearchContainer loading={false} items={ITEMS} />, {
      store,
    });
    await waitFor(() => screen.getAllByTestId('card-item')[0], {
      timeout: 5000,
    });
    const itemCards = screen.getAllByTestId('card-item');

    // Expect
    expect(itemCards.length).toEqual(itemsCount);
  });

  it('No items message is shown when search container are empty', async () => {
    // Arrange
    renderWithProviders(<SearchContainer loading={false} items={[]} />, {
      store,
    });
    await waitFor(() => screen.getByText(NO_ITEMS_MESSAGE), { timeout: 5000 });

    // Expect
    expect(screen.getByText(NO_ITEMS_MESSAGE)).toBeVisible();
  });

  it('Search container component renders the specified number of cards', async () => {
    // Arrange
    renderWithProviders(<SearchContainer loading={false} items={ITEMS} />, {
      store,
    });
    store.dispatch(setDetails(ITEMS[0].id));
    store.dispatch(setItem(ITEMS[0]));
    await waitFor(() => screen.getAllByTestId('card-item')[0], {
      timeout: 5000,
    });
    await waitFor(() => screen.getByTestId('cross-icon'), {
      timeout: 5000,
    });
    fireEvent.click(screen.getByTestId('cross-icon'));

    // Expect
    expect(() => {
      screen.getByTestId('item-profile');
    }).toThrow();
  });
});
