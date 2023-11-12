import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResults from './SearchResults';
import { MemoryRouter } from 'react-router-dom';
import { NO_ITEMS_MESSAGE } from '../../../config';
import { ISearchContext, SearchContext } from '../../../context/SearchContext';
import { ITEMS } from '../../../model/test-items';

describe('Renders Search results section', () => {
  // Arrange
  const itemsCount = ITEMS.length;
  const defaultContext: ISearchContext = {
    countItems: itemsCount,
    setCountItems: () => {},
    setItems: () => {},
    items: ITEMS,
    currentSearchTerm: '',
    setCurrentSearchTerm: () => {},
  };

  it('Search results list component renders the specified number of cards', () => {
    // Arrange
    render(
      <MemoryRouter>
        <SearchContext.Provider value={defaultContext}>
          <SearchResults isLoading={false} />
        </SearchContext.Provider>
      </MemoryRouter>
    );
    const itemCards = screen.getAllByTestId('card-item');

    // Expect
    expect(itemCards.length).toEqual(itemsCount);
  });

  it('No items message is shown when search results are empty', () => {
    // Arrange
    defaultContext.items = [];
    render(
      <MemoryRouter>
        <SearchContext.Provider value={defaultContext}>
          <SearchResults isLoading={false} />
        </SearchContext.Provider>
      </MemoryRouter>
    );
    const message = screen.getByText(NO_ITEMS_MESSAGE);

    // Expect
    expect(message).toBeVisible();
  });
});
