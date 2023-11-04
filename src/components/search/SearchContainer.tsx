import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AxiosError } from 'axios';
import { IItem } from '../../model/response.interface';
import axios, { DEFAULT_PAGE_NUMBER, SEARCH_URI } from '../../axios-config';
import SearchBar from './SearchBar';
import SearchResults from './results/SearchResults';
import Paging from './paging/Paging';
import { SearchContext } from '../../context/SearchContext';
import { useParams } from 'react-router-dom';
import PerPage from './paging/PerPage';

interface ISearchParams {
  page: number;
  per_page?: number;
  beer_name?: string;
}

function SearchContainer() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([] as IItem[]);
  const searchInput = useRef() as MutableRefObject<HTMLInputElement>;
  const {
    setCurrentPage,
    lastSearchTerm,
    setLastSearchTerm,
    itemsPerPage,
    setCountItems,
  } = useContext(SearchContext);
  const { page } = useParams();
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
    getCountItems(lastSearchTerm, 1, 0);
    const currentPage = page && +page > 1 ? +page : DEFAULT_PAGE_NUMBER;
    setCurrentPage(currentPage);
    getItems(lastSearchTerm, currentPage, itemsPerPage);
  }, [lastSearchTerm, error, setCurrentPage, page, itemsPerPage]);

  const fetchItems = async (
    searchTerm: string,
    page: number,
    itemsPerPage: number
  ) => {
    const params: ISearchParams = { page, per_page: itemsPerPage };
    if (searchTerm.length) {
      params['beer_name'] = searchTerm;
    }
    await axios
      .get(SEARCH_URI, {
        params,
      })
      .then((result) => {
        const data = result.data as IItem[];
        setItems(data);
        setError('');
      })
      .catch(function (e) {
        const err = e as AxiosError;
        setItems([] as IItem[]);
        setError(err.message);
      });
  };

  async function getItems(
    searchTerm: string,
    page: number,
    itemsPerPage: number
  ) {
    setLoading(true);
    await fetchItems(searchTerm, page, itemsPerPage);
    setLoading(false);
  }

  async function getCountItems(
    searchTerm: string,
    page = 1,
    previousCount = 0
  ): Promise<void> {
    const params: ISearchParams = { page, per_page: 80 };
    if (searchTerm) {
      params['beer_name'] = searchTerm;
    }
    params['page'] = page;
    const newResponse = await axios.get(SEARCH_URI, {
      params,
    });
    const response = newResponse.data;
    const newCount = previousCount + response.length;
    if (response.length !== 0) {
      page++;
      return await getCountItems(searchTerm, page, newCount);
    }

    setCountItems(newCount);
    setPagesCount(Math.floor(newCount / itemsPerPage));
  }

  const handleSearchClick = async () => {
    const searchTerm = searchInput.current.value.trim();
    if (lastSearchTerm !== searchTerm) {
      window.localStorage.setItem('searchTerm', `${searchTerm}`);
      setLastSearchTerm(searchTerm);
      await getItems(searchTerm, 1, itemsPerPage);
    }
  };

  return (
    <div className="search-container">
      <section className="search-bar-section">
        <SearchBar searchTerm={lastSearchTerm} forwardRef={searchInput} />
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
        {!!pagesCount && <Paging pagesCount={pagesCount} />}
        <PerPage />
      </section>
      <SearchResults isLoading={loading} items={items} />
    </div>
  );
}

export default SearchContainer;
