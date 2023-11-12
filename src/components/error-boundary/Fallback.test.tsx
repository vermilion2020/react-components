import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Fallback from './Fallback';

describe('App tests', () => {
  it('Renders Fallback component properly', () => {
    render(<Fallback />);

    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toHaveTextContent('Oops, an error occur...');
    expect(screen.getByRole('button')).toHaveTextContent('Open Home page');
  });
});
