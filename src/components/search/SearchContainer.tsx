import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './results/SearchResults';
import Paging from './paging/Paging';
import PerPage from './paging/PerPage';
import { AppDispatch, useAppSelector } from '../../redux';
import { getCountItems } from '../../redux/features/searchSlice';
import { useDispatch } from 'react-redux';

function SearchContainer() {
  const [error, setError] = useState('');
  const { loading, countItems, searchTerm } = useAppSelector(
    (state) => state.searchState
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
    dispatch(getCountItems(searchTerm));
  }, [error, countItems, searchTerm]);

  return (
    <div className="search-container">
      <section className="search-bar-section">
        <div className="search-form">
          <SearchBar />
          <button
            className="button"
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
  );
}

export default SearchContainer;
