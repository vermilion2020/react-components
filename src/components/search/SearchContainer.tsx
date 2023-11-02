import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AxiosError } from 'axios';
import { IItem } from '../../model/response.interface';
import axios, {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PER_PAGE,
  SEARCH_URI,
} from '../../axios-config';
import SearchBar from './SearchBar';
import SearchResults from './results/SearchResults';
import Paging from './paging/Paging';
import { SearchContext } from '../../context/SearchContext';
import { useParams } from 'react-router-dom';

interface ISearchParams {
  page: number;
  per_page: number;
  beer_name?: string;
}

function SearchContainer() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([] as IItem[]);
  const searchInput = useRef() as MutableRefObject<HTMLInputElement>;
  const { setCurrentPage, currentPage, lastSearchTerm, setLastSearchTerm } =
    useContext(SearchContext);
  const { page } = useParams();
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
    const currentPage = page ? +page : DEFAULT_PAGE_NUMBER;
    setCurrentPage(currentPage);
    getItems(lastSearchTerm, currentPage);
  }, [lastSearchTerm, error, setCurrentPage, page]);

  const fetchItems = async (searchTerm: string, page: number) => {
    const params: ISearchParams = { page, per_page: DEFAULT_PER_PAGE };
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
        <Paging currentPage={currentPage} pagesCount={pagesCount} />
      </section>
      <SearchResults isLoading={loading} items={items} />
    </div>
  );
}

export default SearchContainer;
