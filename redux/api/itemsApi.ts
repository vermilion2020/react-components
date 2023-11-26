import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config';
import { IError, IItem } from '../../model/response.interface';
import * as details from '../features/detailSlice';
import { HYDRATE } from 'next-redux-wrapper';

interface ISearchParams {
  page?: number;
  per_page?: number;
  beer_name?: string;
}

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['Item'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getItemsList: builder.query<IItem[], ISearchParams>({
      query: ({ page, per_page, beer_name }: ISearchParams) => {
        const params: ISearchParams = { page, per_page };
        params['beer_name'] = beer_name && beer_name.length ? beer_name : ' ';
        const query = {
          url: '',
          method: 'GET',
          params,
        };
        return query;
      },
    }),
    getItem: builder.query<IItem[], number>({
      query: (itemId: number) => ({
        url: `${itemId}`,
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(details.setLoading(true));
          const { data } = await queryFulfilled;
          dispatch(details.setItem(data[0]));
          dispatch(details.setError(null));
          dispatch(details.setLoading(false));
        } catch (e) {
          dispatch(details.setLoading(false));
          const error = <IError>e;
          dispatch(details.setError(error.error.data));
        }
      },
    }),
  }),
});

export const {
  useGetItemsListQuery,
  useGetItemQuery,
  util: { getRunningQueriesThunk },
} = itemsApi;

export const { getItemsList, getItem } = itemsApi.endpoints;
