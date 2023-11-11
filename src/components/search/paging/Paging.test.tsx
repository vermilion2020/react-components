import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useState } from 'react';
import Paging from './Paging';

let mockSearchParam = '';
describe('Paging', async () => {
  it('Click on page button changes url parameters', async () => {
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
        <Paging loading={false} countItems={90} />
      </MemoryRouter>
    );
    const testPageNumber = '2';
    fireEvent.click(screen.getByRole('button', { name: testPageNumber }));
    const newParams = new URLSearchParams(mockSearchParam);
    expect(newParams.get('page')).toEqual(testPageNumber);
  });
});
