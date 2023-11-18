import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ItemsStatMessage from './ItemsStatMessage';
import { DEFAULT_PAGE_NUMBER } from '../../../config';
import { setupStore } from '../../../redux';
import { renderWithProviders } from '../../../test-utils';
import { setPerPage } from '../../../redux/features/searchSlice';

describe('Status message for items', () => {
  it('Renders proper status message for specified count items and search term', () => {
    // Arrange
    const testCount = 5;
    const testTerm = 'test';
    const perPage = 40;
    const store = setupStore();
    store.dispatch(setPerPage(perPage));
    renderWithProviders(
      <MemoryRouter>
        <ItemsStatMessage countItems={testCount} searchTerm={testTerm} />
      </MemoryRouter>,
      { store }
    );

    // Expect
    expect(
      screen.getByText(
        `current page: ${DEFAULT_PAGE_NUMBER} | items per page: ${perPage} | count items for "${testTerm}": ${testCount}`
      )
    ).toBeVisible();
  });
});
