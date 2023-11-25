import { describe, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import Paging from './Paging';
import React from 'react';
import { setupStore } from '../../../redux';
import { renderWithProviders } from '../../../test-utils';

describe('Paging', async () => {
  it('Click on page button changes the page value', async () => {
    // Arrange
    const store = setupStore();
    //store.dispatch(setPerPage(perPage));
    //store.dispatch(setPage(page));
    renderWithProviders(<Paging loading={false} countItems={90} />, { store });
    const testPageNumber = '2';

    // Act
    fireEvent.click(screen.getByRole('button', { name: testPageNumber }));

    // Expect
    expect(store.getState().searchState.page).toEqual(+testPageNumber);
  });
});
