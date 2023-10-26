import { ChangeEvent } from 'react';

interface ISearchBarProps {
  forwardRef: React.RefObject<HTMLInputElement>;
  searchTerm: string;
  handleSearchTermChange: (searchTerm: string) => void;
}

function SearchBar({
  searchTerm,
  forwardRef,
  handleSearchTermChange,
}: ISearchBarProps) {
  const handleChange = (e: ChangeEvent) => {
    const target = (e.target as HTMLInputElement).value as string;
    handleSearchTermChange(target);
  };

  return (
    <div className="search">
      <input
        data-testid="search-input"
        ref={forwardRef}
        className="search-input"
        type="search"
        id="search-input"
        placeholder="Search for a character of Rick and Morty"
        value={searchTerm}
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
  );
}

export default SearchBar;
