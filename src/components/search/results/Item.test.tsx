import { describe, it, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Item from './Item';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ITEMS } from '../../../model/test-items';
import { FETCH_ITEM_RESPONSE, FETCH_LIST_RESPONSE } from '../../../mock';
import { mswServer } from '../../../setupTests';
import { renderWithProviders } from '../../../test-utils';
import { setupStore } from '../../../redux';
import SearchResults from './SearchResults';
import DetailedCard from '../../item/DetailedCard';
import ItemPage from '../../../pages/ItemPage';

describe('Item card tests', () => {
  // Arrange
  const item = ITEMS[0];
  const store = setupStore();

  it('Validate that clicking on a card opens a detailed card component', async () => {
    // Arrange
    mswServer.use(FETCH_LIST_RESPONSE);
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<SearchResults isLoading={false} />}>
            <Route path="" element={<ItemPage />} />
          </Route>
        </Routes>
      </MemoryRouter>,
      { store }
    );
    mswServer.use(FETCH_ITEM_RESPONSE);
    // Act
    await waitFor(() => screen.getAllByTestId('card-item')[0], {
      timeout: 5000,
    });
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

    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<SearchResults isLoading={false} />}>
            <Route path="" element={<DetailedCard />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

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

    renderWithProviders(
      <MemoryRouter>
        <Item item={item} />
      </MemoryRouter>,
      { store }
    );

    // Expect
    expect(screen.getByText(item.name)).toBeVisible();
    expect(screen.getByText(item.tagline)).toBeVisible();
    expect(screen.getByRole('img')).toBeVisible();
  });
});
