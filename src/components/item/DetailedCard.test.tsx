import { describe, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import DetailedCard from './DetailedCard';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ITEMS } from '../../model/test-items';
import HomePage from '../../pages/Home';
import ItemPage from '../../pages/ItemPage';
import { FETCH_ITEM_RESPONSE, FETCH_LIST_RESPONSE } from '../../mock';

describe('Detail tests', () => {
  const mswServer = setupServer();

  const item = ITEMS[0];
  it('Preloader is displayed while fetching data', () => {
    render(
      <MemoryRouter>
        <DetailedCard loading={true} item={item} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('preloader')).toBeVisible();
  });

  it('Detailed card component correctly displays the detailed card data', () => {
    render(
      <MemoryRouter>
        <DetailedCard loading={false} item={item} />
      </MemoryRouter>
    );
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

  it('Clicking the close button hides the component', async () => {
    mswServer.use(FETCH_LIST_RESPONSE);
    mswServer.use(FETCH_ITEM_RESPONSE);

    render(
      <MemoryRouter initialEntries={['?details=63']}>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="" element={<ItemPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => screen.getByTestId('item-profile'), { timeout: 3000 });
    expect(screen.getByTestId('item-profile')).toBeVisible();
    fireEvent.click(screen.getByTestId('cross-icon'));
    expect(() => screen.getByTestId('item-profile')).toThrow();
  });
});
