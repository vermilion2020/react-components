import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '../../App';
import { MemoryRouter } from 'react-router-dom';
import DetailedCard from '../item/DetailedCard';

describe('Not found', () => {
  it('Renders Not found page for unknown url', () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <App />
      </MemoryRouter>
    );

    // Expect
    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toHaveTextContent('Not Found');
    expect(
      screen.getByText('Page or item you are requesting does not exist')
    ).toBeVisible();
  });

  it('Renders Not found page inside Details card if incorrect id is passed', () => {
    // Arrange
    render(
      <MemoryRouter>
        <DetailedCard loading={false} item={null} />
      </MemoryRouter>
    );

    // Expect
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
