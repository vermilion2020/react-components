import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ItemsStatMessage from './ItemsStatMessage';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PER_PAGE } from '../../../config';

describe('Status message for items', () => {
  it('Renders proper status message for specified count items and search term', () => {
    // Arrange
    const testCount = 5;
    const testTerm = 'test';
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <ItemsStatMessage countItems={testCount} searchTerm={testTerm} />
      </MemoryRouter>
    );

    // Expect
    expect(
      screen.getByText(
        `current page: ${DEFAULT_PAGE_NUMBER} | items per page: ${DEFAULT_PER_PAGE} | count items for "${testTerm}": ${testCount}`
      )
    ).toBeVisible();
  });
});
