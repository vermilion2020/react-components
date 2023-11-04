import { useContext, useEffect, useState } from 'react';
import { IItem } from '../../model/response.interface';
import { DEFAULT_PAGE_NUMBER } from '../../config';
import SearchBar from './SearchBar';
import SearchResults from './results/SearchResults';
import Paging from './paging/Paging';
import { SearchContext } from '../../context/SearchContext';
import { useParams } from 'react-router-dom';
import PerPage from './paging/PerPage';
import { fetchCountItems, fetchItems } from '../../api/search-helper';

function SearchContainer() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([] as IItem[]);
  const { setCurrentPage, lastSearchTerm, itemsPerPage, setCountItems } =
    useContext(SearchContext);
  const { page } = useParams();
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
    const currentPage = page && +page > 1 ? +page : DEFAULT_PAGE_NUMBER;
    getItems(lastSearchTerm, currentPage, itemsPerPage);
  }, [lastSearchTerm, error, setCurrentPage, page, itemsPerPage]);

  async function getItems(
    searchTerm: string,
    page: number,
    itemsPerPage: number
  ) {
    setLoading(true);
    const { data, err } = await fetchItems(searchTerm, page, itemsPerPage);
    setItems(data);
    setError(err);
    await getCountItems(lastSearchTerm, 1);
    setCurrentPage(page);
    setLoading(false);
  }

  async function getCountItems(searchTerm: string, page = 1): Promise<void> {
    const newCountItems = await fetchCountItems(searchTerm, page, 0);

    setCountItems(newCountItems);
    setPagesCount(Math.ceil(newCountItems / itemsPerPage));
  }

  return (
    <div className="search-container">
      <section className="search-bar-section">
        <SearchBar />
        <button
          className="button"
          onClick={() => {
            setError('Error!!!');
          }}
        >
          Get an Error
        </button>
        {!!pagesCount && <Paging loading={loading} pagesCount={pagesCount} />}
        <PerPage />
      </section>
      <SearchResults isLoading={loading} items={items} />
    </div>
  );
}

export default SearchContainer;
