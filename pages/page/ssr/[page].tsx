import { useAppSelector, wrapper } from '../../../redux';
import {
  getItemsList,
  getRunningQueriesThunk,
} from '../../../redux/api/itemsApi';

import Page from '../[page]';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const page = +(context.params?.page ?? '');
    const { perPage, searchTerm } = useAppSelector(
      (state) => state.searchState
    );
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
