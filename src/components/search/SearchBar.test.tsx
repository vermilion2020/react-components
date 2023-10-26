import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar, { PLACEHOLDER_TEXT } from './SearchBar';

describe('Search bar tests', () => {
  it('renders searchbar component', () => {
    const searchTerm = '';
    const ref = React.createRef<HTMLInputElement>();
    render(<SearchBar forwardRef={ref} searchTerm={searchTerm} />);
    const searchBarInput = screen.getByPlaceholderText(PLACEHOLDER_TEXT);

    expect(searchBarInput).toBeInTheDocument();
  });

  it('value is set to search bar input', () => {
    const searchTerm = 'Rick';
    const ref = React.createRef<HTMLInputElement>();
    render(<SearchBar forwardRef={ref} searchTerm={searchTerm} />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;

    expect(input.value).toEqual(searchTerm);
  });
});
