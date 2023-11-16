import { useContext, useEffect, useState } from 'react';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PER_PAGE } from '../../config';
import SearchBar from './SearchBar';
import SearchResults from './results/SearchResults';
import Paging from './paging/Paging';
import { SearchContext } from '../../context/SearchContext';
import PerPage from './paging/PerPage';
import { fetchItems } from '../../api/search-helper';
import { useSearchParams } from 'react-router-dom';
import { useGetItemsListQuery } from '../../redux/api/itemsApi';

function SearchContainer() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [prevSearchTerm, setPrevSearchTerm] = useState<null | string>(null);
  const { currentSearchTerm, setCountItems, setItems, countItems } =
    useContext(SearchContext);
  const [searchParams] = useSearchParams();
  const page = +(searchParams.get('page') ?? DEFAULT_PAGE_NUMBER);
  const perPage = +(searchParams.get('per_page') ?? DEFAULT_PER_PAGE);
  const currentPage = page > 0 ? page : DEFAULT_PAGE_NUMBER;

  useGetItemsListQuery({
    page,
    per_page: perPage,
    beer_name: currentSearchTerm,
  });

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
    getItems(currentSearchTerm, currentPage, perPage);
  }, [currentSearchTerm, error, currentPage, perPage]);

  async function getItems(
    searchTerm: string,
    page: number,
    itemsPerPage: number
  ) {
    setLoading(true);
    const { data, err } = await fetchItems(searchTerm, page, itemsPerPage);
    if (currentSearchTerm !== prevSearchTerm || prevSearchTerm === null) {
      await getCountItems(currentSearchTerm);
      setPrevSearchTerm(currentSearchTerm);
    }
    setItems(data);
    setError(err);
    setLoading(false);
  }

  async function getCountItems(searchTerm: string): Promise<void> {
    // const newCountItems = await fetchCountItems(searchTerm, page, 0);
    let lastCount = 0;
    let totalCount = 0;
    let pageCnt = 1;
    do {
      const result = useGetItemsListQuery({
        page: pageCnt,
        per_page: 80,
        beer_name: searchTerm,
      });
      lastCount = result.data ? result.data?.length : 0;
      totalCount += lastCount;
      pageCnt++;
    } while (lastCount > 0);
    console.log(totalCount);

    setCountItems(totalCount);
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
