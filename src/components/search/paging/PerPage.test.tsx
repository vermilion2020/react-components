import { describe, it } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PerPage from './PerPage';
import { setupStore } from '../../../redux';
import { renderWithProviders } from '../../../test-utils';

describe('Per page component', async () => {
  it('Change per page value changes per_page parameter in url', async () => {
    // Arrange
    const testPerPage = '40';
    const store = setupStore();
    renderWithProviders(
      <MemoryRouter>
        <PerPage />
      </MemoryRouter>,
      { store }
    );

    // Act
    fireEvent.click(screen.getByTestId('per-page-current'));
    await waitFor(() => screen.getByTestId('per-page-container'), {
      timeout: 5000,
    });
    fireEvent.click(screen.getByTitle(`${testPerPage}`));

    // Expect
    expect(screen.getByTestId('per-page-current')).toHaveTextContent(
      `${testPerPage}`
    );
  });
});
