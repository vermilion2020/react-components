import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config';
import { IError, IItem } from '../../model/response.interface';
import { setError, setLoading } from '../features/searchSlice';
import * as details from '../features/detailSlice';

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
  endpoints: (builder) => ({
    getItemsList: builder.query<IItem[], ISearchParams>({
      query: ({ page, per_page, beer_name }: ISearchParams) => {
        const params: ISearchParams = { page, per_page };
        if (beer_name && beer_name.length) {
          params['beer_name'] = beer_name;
        }
        const query = {
          url: '',
          method: 'GET',
          params,
        };
        return query;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setLoading(true));
          await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setError(null));
        } catch (e) {
          dispatch(setLoading(false));
          const error = <IError>e;
          dispatch(setError(error.error.data));
        }
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

export const { useGetItemsListQuery, useGetItemQuery } = itemsApi;
