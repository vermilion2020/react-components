import { useContext, useEffect, useState } from 'react';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PER_PAGE } from '../../config';
import SearchBar from './SearchBar';
import SearchResults from './results/SearchResults';
import Paging from './paging/Paging';
import { SearchContext } from '../../context/SearchContext';
import PerPage from './paging/PerPage';
import { fetchCountItems, fetchItems } from '../../api/search-helper';
import { useSearchParams } from 'react-router-dom';

function SearchContainer() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { lastSearchTerm, setCountItems, setItems } = useContext(SearchContext);
  const [searchParams] = useSearchParams({});
  const page = +(searchParams.get('page') ?? DEFAULT_PAGE_NUMBER);
  const perPage = +(searchParams.get('per_page') ?? DEFAULT_PER_PAGE);
  const currentPage = page > 0 ? page : DEFAULT_PAGE_NUMBER;

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
    getItems(lastSearchTerm, currentPage, perPage);
  }, [lastSearchTerm, error, currentPage, perPage]);

  async function getItems(
    searchTerm: string,
    page: number,
    itemsPerPage: number
  ) {
    setLoading(true);
    const { data, err } = await fetchItems(searchTerm, page, itemsPerPage);
    setItems(data);
    setError(err);
    await getCountItems(searchTerm, 1);

    setLoading(false);
  }

  async function getCountItems(searchTerm: string, page = 1): Promise<void> {
    const newCountItems = await fetchCountItems(searchTerm, page, 0);

    setCountItems(newCountItems);
  }

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
          >
            Get an Error
          </button>
          <Paging loading={loading} />
          <PerPage />
        </div>
      </section>
      <SearchResults isLoading={loading} />
    </div>
  );
}

export default SearchContainer;
