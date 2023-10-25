import { Component } from 'react';
import { AxiosResponse } from 'axios';
import { IState } from '../../model/state.interface';
import { IAPIResponse, IItem } from '../../model/response.interface';
import axios, { SEARCH_URI } from '../../axios-config';
import Card from './Card';

interface DefaultState {
  defaultState: IState;
}

class SearchResults extends Component<DefaultState, IState> {
  constructor(props: DefaultState) {
    super(props);
    this.state = props.defaultState;
  }

  componentDidMount() {
    const { pageSize, pageNumber, searchTerm } = this.state;
    const term = searchTerm || 'a';
    axios
      .get(`${SEARCH_URI}?page=${pageNumber}&per_page=${pageSize}&q=${term}`)
      .then((result) => {
        const data = (result as AxiosResponse).data as IAPIResponse;
        console.log(data);
        this.setState({
          isLoading: false,
          items: data.items,
        });
      });
  }

  componentWillUnmount() {}

  render() {
    const { isLoading, error, items } = this.state;
    return (
      <div className="items-list">
        {error && <div>{error}</div>}
        {isLoading && <div>Loading...</div>}
        {!isLoading &&
          !error &&
          items.map((item: IItem) => <Card item={item} key={item.id} />)}
      </div>
    );
  }
}

export default SearchResults;
