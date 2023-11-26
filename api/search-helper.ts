import axios from 'axios';
import { API_BASE_URL } from '../config';

interface ISearchParams {
  page: number;
  per_page?: number;
  beer_name?: string;
}

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
  const newResponse = await axios.get(API_BASE_URL, {
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
