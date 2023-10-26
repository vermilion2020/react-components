import { Component, createRef } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { IState } from '../../model/state.interface';
import { IAPIResponse, IItem } from '../../model/response.interface';
import axios, { SEARCH_URI } from '../../axios-config';
import Item from './Item';
import SearchBar from './SearchBar';
import Preloader from '../Preloader';

interface DefaultState {
  defaultState: IState;
}

class Search extends Component<DefaultState, IState> {
  searchRef: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  constructor(props: DefaultState) {
    super(props);
    this.state = props.defaultState;
  }

  getItems() {
    const { pageNumber, debounced } = this.state;
    this.setState({
      ...this.state,
      isLoading: true,
    });
    axios
      .get(`${SEARCH_URI}?page=${pageNumber}&name=${debounced}`)
      .then((result) => {
        let data = [] as IItem[];
        if ('data' in result) {
          data = ((result as AxiosResponse).data as IAPIResponse).results;
        }
        this.setState({
          ...this.state,
          isLoading: false,
          items: data,
        });
      })
      .catch((err: AxiosError) => {
        const error = err.message;
        this.setState({
          ...this.state,
          isLoading: false,
          error,
        });
      });
  }

  setDebounced(searchTerm: string) {
    const handler = setTimeout(() => {
      this.setState({ ...this.state, debounced: searchTerm });
    }, 300);
    return () => clearTimeout(handler);
  }

  componentDidMount() {
    this.getItems();
  }

  componentDidUpdate(_: Readonly<DefaultState>, prevState: Readonly<IState>) {
    const { debounced, searchTerm } = this.state;
    if (prevState.debounced !== debounced && debounced === searchTerm) {
      this.getItems();
    }
  }

  handleSearchTermchange = (searchTerm: string) => {
    const term = searchTerm.trim();
    window.localStorage.setItem('searchTerm', `${term}`);
    this.setDebounced(term);
    this.setState({ ...this.state, searchTerm });
  };

  render() {
    const { isLoading, error, items, searchTerm } = this.state;
    return (
      <div className="search-container">
        <section className="search-bar-section">
          <SearchBar
            searchTerm={searchTerm}
            handleSearchTermChange={this.handleSearchTermchange}
            forwardRef={this.searchRef}
          />
        </section>
        <section className="search-results-section">
          {error && <div>{error}</div>}
          {isLoading && <Preloader />}
          {!isLoading && !error && !items.length && (
            <div className="no-items-message">
              No items found for the current search term
            </div>
          )}
          {!isLoading &&
            !error &&
            items.length !== 0 &&
            items.map((item: IItem) => <Item item={item} key={item.id} />)}
        </section>
      </div>
    );
  }
}

export default Search;
