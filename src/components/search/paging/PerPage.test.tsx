import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useState } from 'react';
import PerPage from './PerPage';

let mockSearchParam = '';
describe('Per page component', async () => {
  it('Change per page value changes per_page parameter in url', async () => {
    // Arrange
    vi.mock('react-router-dom', async (importOriginal) => {
      const actual = (await importOriginal()) as object;

      return {
        ...actual,
        useSearchParams: () => {
          const [params, setParams] = useState(
            new URLSearchParams(mockSearchParam)
          );
          return [
            params,
            (newParams: string) => {
              mockSearchParam = newParams;
              setParams(new URLSearchParams(newParams));
            },
          ];
        },
      };
    });

    render(
      <MemoryRouter>
        <PerPage />
      </MemoryRouter>
    );
    const testPerPage = '40';

    // Act
    fireEvent.click(screen.getByTestId('per-page-current'));
    await waitFor(() => screen.getByTestId('per-page-container'), {
      timeout: 1000,
    });
    fireEvent.click(screen.getByTitle(`${testPerPage}`));
    const newParams = new URLSearchParams(mockSearchParam);

    // Expect
    expect(newParams.get('per_page')).toEqual(testPerPage);
  });
});
