import { Component, createRef } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { IState } from '../../model/state.interface';
import { IAPIResponse, IItem } from '../../model/response.interface';
import axios, { SEARCH_URI } from '../../axios-config';
import SearchBar from './SearchBar';
import SearchResults from './results/SearchResults';

interface DefaultState {
  defaultState: IState;
}

class SearchContainer extends Component<DefaultState, IState> {
  searchRef: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  constructor(props: DefaultState) {
    super(props);
    this.state = props.defaultState;
  }

  getItems(searchTerm: string) {
    const { pageNumber } = this.state;
    this.setState({
      ...this.state,
      isLoading: true,
    });
    axios
      .get(SEARCH_URI, { params: { page: pageNumber, name: searchTerm } })
      .then((result) => {
        let data = [] as IItem[];
        if ('data' in result) {
          data = ((result as AxiosResponse).data as IAPIResponse).results;
        }
        this.setState({
          ...this.state,
          isLoading: false,
          items: data,
          searchTerm,
        });
      })
      .catch((err: AxiosError) => {
        const error = err.message;
        this.setState({
          ...this.state,
          isLoading: false,
          error,
          searchTerm,
        });
      });
  }

  componentDidMount() {
    this.getItems(this.state.searchTerm);
  }

  componentDidUpdate() {
    if (this.state.error) {
      throw new Error(this.state.error);
    }
  }

  handleSearchClick = () => {
    const { searchTerm: oldSearchTerm } = this.state;
    const searchTerm = this.searchRef.current?.value.trim() ?? '';
    if (oldSearchTerm !== searchTerm) {
      window.localStorage.setItem('searchTerm', `${searchTerm}`);
      this.getItems(searchTerm);
    }
  };

  setError = () => {
    this.setState({ ...this.state, error: 'Component crashed!' });
  };

  render() {
    const { isLoading, items, searchTerm } = this.state;
    return (
      <div className="search-container">
        <section className="search-bar-section">
          <SearchBar searchTerm={searchTerm} forwardRef={this.searchRef} />
          <button className="button" onClick={this.handleSearchClick}>
            Search
          </button>
          <button className="button" onClick={this.setError}>
            Get an Error
          </button>
        </section>
        <SearchResults isLoading={isLoading} items={items} />
      </div>
    );
  }
}

export default SearchContainer;
