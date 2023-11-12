import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { WrappedApp } from './App';

describe('App tests', () => {
  it('Renders React Components the first level heading', () => {
    // Arrange
    render(<WrappedApp />);

    // Expect
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('React. Tests/Context API');
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
