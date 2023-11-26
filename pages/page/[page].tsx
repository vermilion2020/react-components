import React from 'react';
import SearchContainer from '../../components/search/SearchContainer';
import { useRouter } from 'next/router';
import { useAppSelector, wrapper } from '../../redux';
import {
  getItemsList,
  getRunningQueriesThunk,
  useGetItemsListQuery,
} from '../../redux/api/itemsApi';

function Page() {
  const router = useRouter();
  const page = +(router.query.page ?? '1');
  const { perPage, searchTerm } = useAppSelector((state) => state.searchState);
  const { data, isFetching } = useGetItemsListQuery(
    {
      page,
      per_page: perPage,
      beer_name: searchTerm,
    },
    {
      skip: router.isFallback,
    }
  );
  const items = data && data.length ? data : [];
  return <SearchContainer items={items} loading={isFetching} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const page = +(context.params?.page ?? '');
    const { perPage, searchTerm } = store.getState().searchState;
    if (page) {
      store.dispatch(
        getItemsList.initiate({
          page,
          per_page: perPage,
          beer_name: searchTerm,
        })
      );
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {},
    };
  }
);

export default Page;
