interface ISearchBarProps {
  forwardRef: React.RefObject<HTMLInputElement>;
  searchTerm: string;
}

function SearchBar({ searchTerm, forwardRef }: ISearchBarProps) {
  return (
    <div className="search">
      <input
        data-testid="search-input"
        ref={forwardRef}
        className="search-input"
        type="search"
        id="search-input"
        placeholder="Search for a character of Rick and Morty"
        defaultValue={searchTerm}
        autoComplete="off"
      />
    </div>
  );
}

export default SearchBar;
