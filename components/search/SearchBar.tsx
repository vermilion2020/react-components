import React from 'react';
import { DEFAULT_PAGE_NUMBER } from '../../config';
import { useState, ChangeEvent } from 'react';
import { AppDispatch, useAppSelector } from '../../redux';
import { setSearchTerm } from '../../redux/features/searchSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import classes from '../../styles/search.module.css';

export const PLACEHOLDER_TEXT = 'Search for a beer';

function SearchBar() {
  const { searchTerm: currentSearchTerm } = useAppSelector(
    (state) => state.searchState
  );
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSearchClick = async () => {
    if (currentSearchTerm !== searchValue) {
      localStorage.setItem('searchTerm', `${searchValue}`);
      dispatch(setSearchTerm(searchValue));
      router.push(`/page/${DEFAULT_PAGE_NUMBER}`);
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
      className={classes.searchForm}
      onSubmit={(e: React.KeyboardEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <div className={classes.search}>
        <input
          data-testid="search-input"
          className={classes.searchInput}
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
          searchValue === currentSearchTerm
            ? `${classes.button} ${classes.disabled}`
            : classes.button
        }
        onClick={() => handleSearchClick()}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
