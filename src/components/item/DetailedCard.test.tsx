import { describe, it } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import DetailedCard from './DetailedCard';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ITEMS } from '../../model/test-items';
import { FETCH_ITEM_RESPONSE, FETCH_LIST_RESPONSE } from '../../mock';
import { renderWithProviders } from '../../test-utils';
import { mswServer } from '../../setupTests';
import { setupStore } from '../../redux';
import { setItem, setLoading } from '../../redux/features/detailSlice';
import * as search from '../../redux/features/searchSlice';
import SearchResults from '../search/results/SearchResults';

describe('Detailed Card tests', () => {
  mswServer.use(FETCH_ITEM_RESPONSE);

  it('Preloader is displayed while fetching data', () => {
    // Arrange
    const store = setupStore();
    store.dispatch(setLoading(true));
    renderWithProviders(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>,
      { store }
    );

    // Expect
    expect(screen.getByTestId('preloader')).toBeVisible();
  });

  it('Clicking the close button hides the component', async () => {
    // Arrange
    mswServer.use(FETCH_LIST_RESPONSE);
    mswServer.use(FETCH_ITEM_RESPONSE);
    const item = ITEMS[0];
    const store = setupStore();
    store.dispatch(setItem(item));
    store.dispatch(setLoading(false));
    store.dispatch(search.setDetails(item.id));
    store.dispatch(search.setLoading(false));

    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<SearchResults isLoading={false} />}>
            <Route path="" element={<DetailedCard />} />
          </Route>
        </Routes>
      </MemoryRouter>,
      { store }
    );

    // Act
    await waitFor(() => screen.getByTestId('item-profile'), { timeout: 5000 });
    fireEvent.click(screen.getByTestId('cross-icon'));

    // Expect
    expect(() => screen.getByTestId('item-profile')).toThrow();
  });

  it('Detailed card component correctly displays the detailed card data', async () => {
    // Arrange
    const item = ITEMS[0];
    mswServer.use(FETCH_ITEM_RESPONSE);

    const store = setupStore();
    store.dispatch(setItem(item));
    store.dispatch(search.setDetails(item.id));
    store.dispatch(setLoading(false));

    renderWithProviders(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>,
      { store }
    );

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
