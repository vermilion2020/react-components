import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WrappedApp } from './App';

describe('App tests', () => {
  it('Renders React Components the first level heading', () => {
    render(<WrappedApp />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('React. Tests/Context API');
  });
});
