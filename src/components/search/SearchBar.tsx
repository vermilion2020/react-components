import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE_NUMBER } from '../../config';
import { useState, ChangeEvent } from 'react';
import { AppDispatch, useAppSelector } from '../../redux';
import { setSearchTerm } from '../../redux/features/searchSlice';
import { useDispatch } from 'react-redux';

export const PLACEHOLDER_TEXT = 'Search for a beer';

function SearchBar() {
  const defaultSearchTerm = localStorage.getItem('searchTerm') ?? '';
  const { searchTerm: currentSearchTerm } = useAppSelector(
    (state) => state.searchState
  );
  const [searchValue, setSearchValue] = useState(defaultSearchTerm);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchClick = async () => {
    if (currentSearchTerm !== searchValue) {
      window.localStorage.setItem('searchTerm', `${searchValue}`);
      dispatch(setSearchTerm(searchValue));
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
    setSearchValue(term);
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
          value={searchValue}
          autoComplete="off"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
      </div>
      <button
        type="button"
        className={
          searchValue === currentSearchTerm ? `button disabled` : `button`
        }
        onClick={() => handleSearchClick()}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
