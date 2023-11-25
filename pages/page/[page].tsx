import React from 'react';
import SearchContainer from '../../components/search/SearchContainer';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../redux';
import { useGetItemsListQuery } from '../../redux/api/itemsApi';

function Page() {
  const router = useRouter();
  const page = +(router.query.page ?? '1');
  const { perPage } = useAppSelector((state) => state.searchState);
  let defaultSearchTerm = '';
  if (typeof window !== 'undefined') {
    defaultSearchTerm = localStorage.getItem('searchTerm') ?? '';
  }
  useGetItemsListQuery(
    {
      page,
      per_page: perPage,
      beer_name: defaultSearchTerm,
    },
    {
      skip: router.isFallback,
    }
  );

  return <SearchContainer />;
}

export default Page;
