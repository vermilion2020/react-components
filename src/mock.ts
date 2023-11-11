import { http, HttpResponse } from 'msw';
import { ITEMS } from './model/test-items';

const path = 'https://api.punkapi.com/v2/beers';

export const fetch_list_response = http.get(path, () => {
  return new HttpResponse(JSON.stringify(ITEMS));
});

export const fetch_item_response = http.get(`${path}/63`, () => {
  return new HttpResponse(JSON.stringify(ITEMS[0]));
});

export const handlers = [fetch_list_response, fetch_item_response];
