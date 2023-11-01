import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { IItem } from '../../model/response.interface';
import axios, { DEFAULT_PER_PAGE, SEARCH_URI } from '../../axios-config';
import SearchBar from './SearchBar';
import SearchResults from './results/SearchResults';
import { useParams } from 'react-router-dom';
import Paging from './Paging';

function SearchContainer() {
  const defaultSearchTerm = (localStorage.getItem('searchTerm') ?? '').trim();
  const [error, setError] = useState('');
  const [lastSearchTerm, setLastSearchTerm] = useState(defaultSearchTerm);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([] as IItem[]);
  const searchInput = useRef() as MutableRefObject<HTMLInputElement>;
  const { page: currentPage } = useParams();
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
    const page = currentPage ? +currentPage : 1;
    getItems(defaultSearchTerm, page);
  }, [defaultSearchTerm, error, currentPage]);

  const fetchItems = async (searchTerm: string, page: number) => {
    await axios
      .get(SEARCH_URI, {
        params: { page, beer_name: searchTerm, per_page: DEFAULT_PER_PAGE },
      })
      .then((result) => {
        const data = result.data as IItem[];
        setItems(data);
        setPagesCount(data.length);
        setError('');
      })
      .catch(function (e) {
        const err = e as AxiosError;
        setItems([] as IItem[]);
        setError(err.message);
      });
  };

  async function getItems(searchTerm: string, page: number) {
    setLoading(true);
    await fetchItems(searchTerm, page);
    setLoading(false);
  }

  const handleSearchClick = async () => {
    const searchTerm = searchInput.current.value.trim();
    if (lastSearchTerm !== searchTerm) {
      window.localStorage.setItem('searchTerm', `${searchTerm}`);
      setLastSearchTerm(searchTerm);
      await getItems(searchTerm, 1);
    }
  };

  return (
    <div className="search-container">
      <section className="search-bar-section">
        <SearchBar searchTerm={defaultSearchTerm} forwardRef={searchInput} />
        <button
          className="button"
          onClick={() => {
            handleSearchClick();
          }}
        >
          Search
        </button>
        <button
          className="button"
          onClick={() => {
            setError('Error!!!');
          }}
        >
          Get an Error
        </button>
        <Paging currentPage={currentPage} pagesCount={pagesCount} />
      </section>
      <SearchResults isLoading={loading} items={items} />
    </div>
  );
}

export default SearchContainer;
