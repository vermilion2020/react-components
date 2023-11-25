import React from 'react';
import SearchContainer from '../components/search/SearchContainer';
import { useAppSelector } from '../redux';
import { useGetItemsListQuery } from '../redux/api/itemsApi';
import { DEFAULT_PAGE_NUMBER } from '../config';

export default function Index() {
  const { perPage } = useAppSelector((state) => state.searchState);
  let defaultSearchTerm = '';
  if (typeof window !== 'undefined') {
    defaultSearchTerm = localStorage.getItem('searchTerm') ?? '';
  }
  useGetItemsListQuery({
    page: DEFAULT_PAGE_NUMBER,
    per_page: perPage,
    beer_name: defaultSearchTerm,
  });
  return <SearchContainer />;
}
