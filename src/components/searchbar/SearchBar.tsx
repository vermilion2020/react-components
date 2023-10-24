import React, { ChangeEvent } from 'react';

interface ISearchBarProps {
  searchTerm: string;
  handleSearchTermChange: (searchTerm: string) => void;
}

function SearchBar({ searchTerm, handleSearchTermChange }: ISearchBarProps) {
  const handleChange = (e: ChangeEvent) => {
    const target = (e.target as HTMLInputElement).value as string;
    handleSearchTermChange(target);
  };

  return (
    <div className="search">
      <input
        data-testid="search-input"
        className="search-input"
        type="search"
        id="search-input"
        placeholder="Search Kites"
        value={searchTerm}
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
  );
}

export default SearchBar;
