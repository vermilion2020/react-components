import { http, HttpResponse } from 'msw';
import { ITEMS } from './model/test-items';

const path = 'https://api.punkapi.com/v2/beers';

export const FETCH_LIST_RESPONSE = http.get(path, () => {
  return new HttpResponse(JSON.stringify(ITEMS));
});

export const FETCH_LIST_PAGE_RESPONSE_1 = http.get(path, ({ request }) => {
  const url = new URL(request.url);
  url.searchParams.set('page', '1');
  return new HttpResponse(JSON.stringify(ITEMS));
});

export const FETCH_LIST_PAGE_RESPONSE_2 = http.get(path, ({ request }) => {
  const url = new URL(request.url);
  url.searchParams.set('page', '2');
  return new HttpResponse(JSON.stringify(ITEMS));
});

export const FETCH_LIST_PAGE_RESPONSE_3 = http.get(path, ({ request }) => {
  const url = new URL(request.url);
  url.searchParams.set('page', '3');
  return new HttpResponse(JSON.stringify([]));
});

export const FETCH_ITEM_RESPONSE = http.get(`${path}/63`, () => {
  return new HttpResponse(JSON.stringify(ITEMS[0]));
});

export const handlers = [FETCH_LIST_RESPONSE, FETCH_ITEM_RESPONSE];
