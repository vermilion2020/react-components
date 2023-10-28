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

  getItems() {
    const { pageNumber, searchTerm } = this.state;
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

  componentDidMount() {
    this.getItems();
  }

  componentDidUpdate(_: DefaultState, prevState: IState) {
    const { error, searchTerm } = this.state;
    const { searchTerm: oldSearchTerm } = prevState;
    if (error) {
      throw new Error(error);
    }
    if (searchTerm !== oldSearchTerm) {
      this.getItems();
    }
  }

  handleSearchTermchange = () => {
    const { searchTerm: oldSearchTerm } = this.state;
    const searchTerm = this.searchRef.current?.value.trim() ?? '';
    if (oldSearchTerm !== searchTerm) {
      window.localStorage.setItem('searchTerm', `${searchTerm}`);
      this.setState({ ...this.state, searchTerm });
    }
  };

  setError = () => {
    this.setState({ ...this.state, error: 'Component crashed!' });
  };

  render() {
    const { isLoading, error, items, searchTerm } = this.state;
    return (
      <div className="search-container">
        <section className="search-bar-section">
          <SearchBar searchTerm={searchTerm} forwardRef={this.searchRef} />
          <button className="button" onClick={this.handleSearchTermchange}>
            Search
          </button>
          <button className="button" onClick={this.setError}>
            Cause Error
          </button>
        </section>
        <SearchResults isLoading={isLoading} error={error} items={items} />
      </div>
    );
  }
}

export default SearchContainer;
