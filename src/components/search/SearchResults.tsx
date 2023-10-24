import React, { Component } from 'react';
import { AxiosResponse } from 'axios';
import { IState } from '../../model/state.interface';
import { IAPIResponse, IEpisode } from '../../model/response.interface';
import axios, { DEFAULT_PAGE_SIZE, EPISODES } from '../../axios-config';
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
    axios
      .get(`${EPISODES}?pageNumber=0&pageSize=${DEFAULT_PAGE_SIZE}`)
      .catch((error) => {
        this.setState({
          error,
          isLoading: false,
        });
      })
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
          items.map((item: IEpisode) => <Card item={item} key={item.uid} />)}
      </div>
    );
  }
}

export default SearchResults;
