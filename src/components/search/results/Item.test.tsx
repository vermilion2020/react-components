import { describe, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Item from './Item';
import { setupServer } from 'msw/node';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ITEMS } from '../../../model/test-items';
import { FETCH_ITEM_RESPONSE, FETCH_LIST_RESPONSE } from '../../../mock';
import { WrappedApp } from '../../../App';
import HomePage from '../../../pages/Home';
import ItemPage from '../../../pages/ItemPage';

describe('Item card tests', () => {
  // Arrange
  const mswServer = setupServer();

  const item = ITEMS[0];

  it('Card component renders the relevant card data', () => {
    // Arrange
    mswServer.use(FETCH_LIST_RESPONSE);
    mswServer.use(FETCH_ITEM_RESPONSE);

    render(
      <MemoryRouter>
        <Item item={item} />
      </MemoryRouter>
    );

    // Expect
    expect(screen.getByText(item.name)).toBeVisible();
    expect(screen.getByText(item.tagline)).toBeVisible();
    expect(screen.getByRole('img')).toBeVisible();
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    // Arrange
    mswServer.use(FETCH_LIST_RESPONSE);
    mswServer.use(FETCH_ITEM_RESPONSE);

    render(<WrappedApp />);

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
    const { requestSpy } = vi.hoisted(() => {
      return { requestSpy: vi.fn() };
    });

    vi.mock('../../../api/search-helper.ts', async () => {
      const actual = await vi.importActual('../../../api/search-helper.ts');
      requestSpy.call('1');
      return actual;
    });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="" element={<ItemPage />} />
          </Route>
        </Routes>
        <Item item={item} />
      </MemoryRouter>
    );

    // Act
    await waitFor(() => screen.getAllByTestId('card-item')[0], {
      timeout: 5000,
    });
    fireEvent.click(screen.getAllByTestId('card-item')[0]);

    // Expect
    expect(requestSpy).toHaveBeenCalled();
  });

  mswServer.close();
});
