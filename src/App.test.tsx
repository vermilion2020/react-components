import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
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
  <WrappedApp />;

  it('Fallback Ui is shown when an error occur', () => {
    render(<WrappedApp />);
    fireEvent.click(screen.getByTestId('error-button'));
    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toHaveTextContent('Oops, an error occur...');
    expect(screen.getByRole('button')).toHaveTextContent('Open Home page');
  });
});
