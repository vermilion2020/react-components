import axios, { SEARCH_URI } from '../config';
import { AxiosError } from 'axios';
import { IItem } from '../model/response.interface';

interface ISearchParams {
  page: number;
  per_page?: number;
  beer_name?: string;
}

export const fetchItems = async (
  searchTerm: string,
  page: number,
  itemsPerPage: number
): Promise<{ data: IItem[]; err: string }> => {
  const params: ISearchParams = { page, per_page: itemsPerPage };
  if (searchTerm.length) {
    params['beer_name'] = searchTerm;
  }
  let data = [] as IItem[];
  let err = '';
  try {
    const result = await axios.get(SEARCH_URI, {
      params,
    });
    data = result.data as IItem[];
  } catch (e) {
    err = (e as AxiosError).message;
  }
  return { data, err };
};

export async function fetchCountItems(
  searchTerm: string,
  page = 1,
  previousCount = 0
): Promise<number> {
  const params: ISearchParams = { page, per_page: 80 };
  if (searchTerm) {
    params['beer_name'] = searchTerm;
  }
  params['page'] = page;
  const newResponse = await axios.get(SEARCH_URI, {
    params,
  });
  const response = newResponse.data;
  const newCount = previousCount + response.length;
  if (response.length !== 0) {
    page++;
    return await fetchCountItems(searchTerm, page, newCount);
  }
  return newCount;
}
