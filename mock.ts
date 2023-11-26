import { http, HttpResponse } from 'msw';
import { ITEMS } from './model/test-items';

export const PATH = 'https://api.punkapi.com/v2/beers';

export const FETCH_LIST_RESPONSE = http.get(PATH, () => {
  return new HttpResponse(JSON.stringify(ITEMS));
});

export const EMPTY_LIST_RESPONSE = http.get(PATH, () => {
  return new HttpResponse(JSON.stringify([]));
});

export const FETCH_ITEM_RESPONSE = http.get(`${PATH}/63`, () => {
  return new HttpResponse(JSON.stringify([{ ...ITEMS[0] }]));
});

export const handlers = [FETCH_LIST_RESPONSE, FETCH_ITEM_RESPONSE];
