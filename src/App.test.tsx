import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { WrappedApp } from './App';
import { mswServer } from './setupTests';
import { FETCH_LIST_RESPONSE } from './mock';

describe('App tests', () => {
  mswServer.use(FETCH_LIST_RESPONSE);

  it('Renders React Components the first level heading', () => {
    // Arrange
    render(<WrappedApp />);

    // Expect
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Redux. RTK.');
  });
  <WrappedApp />;

  it('Fallback Ui is shown when an error occur', () => {
    // Arrange
    render(<WrappedApp />);

    // Act
    fireEvent.click(screen.getByTestId('error-button'));

    // Expect
    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toHaveTextContent('Oops, an error occur...');
    expect(screen.getByRole('button')).toHaveTextContent('Open Home page');
  });
});
