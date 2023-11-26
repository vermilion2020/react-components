import React from 'react';
import SearchContainer from '../components/search/SearchContainer';
import { useAppSelector, wrapper } from '../redux';
import {
  getItemsList,
  getRunningQueriesThunk,
  useGetItemsListQuery,
} from '../redux/api/itemsApi';
import { DEFAULT_PAGE_NUMBER } from '../config';

export default function Index() {
  const { perPage, searchTerm } = useAppSelector((state) => state.searchState);
  const { data, isFetching } = useGetItemsListQuery({
    page: DEFAULT_PAGE_NUMBER,
    per_page: perPage,
    beer_name: searchTerm,
  });
  const items = data && data.length ? data : [];
  return <SearchContainer items={items} loading={isFetching} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const { perPage, searchTerm } = store.getState().searchState;
    store.dispatch(
      getItemsList.initiate({
        page: DEFAULT_PAGE_NUMBER,
        per_page: perPage,
        beer_name: searchTerm,
      })
    );
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
