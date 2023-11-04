import { render, screen } from '@testing-library/react';
import SearchBar, { PLACEHOLDER_TEXT } from './SearchBar';
import { MemoryRouter } from 'react-router-dom';

describe('Search bar tests', () => {
  it('renders searchbar component', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    const searchBarInput = screen.getByPlaceholderText(PLACEHOLDER_TEXT);

    expect(searchBarInput).toBeInTheDocument();
  });
});
