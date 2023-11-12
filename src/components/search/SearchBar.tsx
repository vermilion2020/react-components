import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE_NUMBER } from '../../config';
import { SearchContext } from '../../context/SearchContext';
import { useContext, useState, ChangeEvent } from 'react';

export const PLACEHOLDER_TEXT = 'Search for a beer';

function SearchBar() {
  const defaultSearchTerm = localStorage.getItem('searchTerm') ?? '';
  const { currentSearchTerm, setCurrentSearchTerm } = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchClick = async () => {
    if (currentSearchTerm !== searchTerm) {
      window.localStorage.setItem('searchTerm', `${searchTerm}`);
      setCurrentSearchTerm(searchTerm);
      searchParams.set('page', `${DEFAULT_PAGE_NUMBER}`);
      setSearchParams(searchParams);
    }
  };

  const handleSubmit = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearchClick();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.trim();
    setSearchTerm(term);
  };

  return (
    <form
      className="search-form"
      onSubmit={(e: React.KeyboardEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <div className="search">
        <input
          data-testid="search-input"
          className="search-input"
          type="search"
          id="search-input"
          placeholder={PLACEHOLDER_TEXT}
          value={searchTerm}
          autoComplete="off"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
      </div>
      <button
        type="button"
        className={
          searchTerm === currentSearchTerm ? `button disabled` : `button`
        }
        onClick={() => handleSearchClick()}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
