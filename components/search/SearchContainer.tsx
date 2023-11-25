import React from 'react';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './results/SearchResults';
import Paging from './paging/Paging';
import PerPage from './paging/PerPage';
import { AppDispatch, useAppSelector } from '../../redux';
import { getCountItems } from '../../redux/features/searchSlice';
import { useDispatch } from 'react-redux';
import classes from '../../styles/search.module.css';

function SearchContainer() {
  const [error, setError] = useState('');
  const { loading, countItems, searchTerm, page } = useAppSelector(
    (state) => state.searchState
  );
  let defaultSearchTerm = '';
  if (typeof window !== 'undefined') {
    defaultSearchTerm = localStorage.getItem('searchTerm') ?? '';
  }
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
    dispatch(getCountItems(defaultSearchTerm));
  }, [error, countItems, searchTerm, page]);

  return (
    <div className={classes.content}>
      <div className={classes.searchContainer}>
        <section className={classes.searchBarSection}>
          <div className={classes.searchForm}>
            <SearchBar />
            <button
              className={classes.button}
              onClick={() => {
                setError('Error!!!');
              }}
              data-testid="error-button"
            >
              Get an Error
            </button>
            <Paging loading={loading} countItems={countItems} />
            <PerPage />
          </div>
        </section>
        <SearchResults isLoading={loading} />
      </div>
    </div>
  );
}

export default SearchContainer;
