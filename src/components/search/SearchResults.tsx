import { Component } from 'react';
import { AxiosResponse } from 'axios';
import { IState } from '../../model/state.interface';
import { IAPIResponse, IItem } from '../../model/response.interface';
import axios, { EPISODES_SEARCH_URI } from '../../axios-config';
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
    const { pageSize, pageNumber } = this.state;
    axios
      .get(
        `${EPISODES_SEARCH_URI}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .then((result) => {
        const data = (result as AxiosResponse).data as IAPIResponse;
        this.setState({
          isLoading: false,
          items: data.episodes,
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
          items.map((item: IItem) => <Card item={item} key={item.uid} />)}
      </div>
    );
  }
}

export default SearchResults;
