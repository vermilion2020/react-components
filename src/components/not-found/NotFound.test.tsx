import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '../../App';
import { MemoryRouter } from 'react-router-dom';

describe('Not found', () => {
  it('Renders Not found page for unknown url', () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toHaveTextContent('Not Found');
    expect(
      screen.getByText('Page or item you are requesting does not exist')
    ).toBeVisible();
  });
});
