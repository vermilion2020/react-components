import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { IAPIResponse, IItem } from '../../model/response.interface';
import axios, { SEARCH_URI } from '../../axios-config';
import SearchBar from './SearchBar';
import SearchResults from './results/SearchResults';

function SearchContainer() {
  const defaultSearchTerm = (localStorage.getItem('searchTerm') ?? '').trim();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([] as IItem[]);
  const searchInput = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
    getItems(defaultSearchTerm);
  }, [defaultSearchTerm, error]);

  const fetchItems = async (searchTerm: string, pageNumber: number) => {
    await axios
      .get(SEARCH_URI, {
        params: { page: pageNumber, name: searchTerm },
      })
      .then((result) => {
        const data = (result as AxiosResponse).data as IAPIResponse;
        'error' in data ? setItems([] as IItem[]) : setItems(data.results);
      })
      .catch(function (e) {
        const err = e as AxiosError;
        setItems([] as IItem[]);
        setError(err.message);
      });
  };

  async function getItems(searchTerm: string) {
    setLoading(true);
    await fetchItems(searchTerm, 0);
    setLoading(false);
  }

  const handleSearchClick = async () => {
    const searchTerm = searchInput.current.value.trim();
    window.localStorage.setItem('searchTerm', `${searchTerm}`);
    await getItems(searchTerm);
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
      </section>
      <SearchResults isLoading={loading} items={items} />
    </div>
  );
}

export default SearchContainer;
