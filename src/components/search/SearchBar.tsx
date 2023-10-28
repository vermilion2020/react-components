interface ISearchBarProps {
  forwardRef: React.RefObject<HTMLInputElement>;
  searchTerm: string;
}

export const PLACEHOLDER_TEXT = 'Search for a character';

function SearchBar({ searchTerm, forwardRef }: ISearchBarProps) {
  return (
    <div className="search">
      <input
        data-testid="search-input"
        ref={forwardRef}
        className="search-input"
        type="search"
        id="search-input"
        placeholder={PLACEHOLDER_TEXT}
        defaultValue={searchTerm}
        autoComplete="off"
      />
    </div>
  );
}

export default SearchBar;
