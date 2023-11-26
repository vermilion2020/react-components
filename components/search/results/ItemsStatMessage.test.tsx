import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import ItemsStatMessage from './ItemsStatMessage';
import { setupStore } from '../../../redux';
import { renderWithProviders } from '../../../test-utils';
import { setPage, setPerPage } from '../../../redux/features/searchSlice';
import React from 'react';

describe('Status message for items', () => {
  it('Renders proper status message for specified count items and search term', () => {
    // Arrange
    const testCount = 5;
    const testTerm = 'test';
    const page = 2;
    const perPage = 40;
    const store = setupStore();
    store.dispatch(setPerPage(perPage));
    store.dispatch(setPage(page));
    renderWithProviders(
      <ItemsStatMessage countItems={testCount} searchTerm={testTerm} />,
      { store }
    );

    // Expect
    expect(
      screen.getByText(
        `current page: ${page} | items per page: ${perPage} | count items for "${testTerm}": ${testCount}`
      )
    ).toBeVisible();
  });
});
