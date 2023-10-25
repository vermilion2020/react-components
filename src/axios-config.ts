import axios, { AxiosError } from 'axios';

export const SEARCH_URI = 'character/';
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE_NUMBER = 0;

axios.defaults.baseURL = 'https://rickandmortyapi.com/api/';

axios.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => {
    console.log(`err: ${error}`);
    if (error.response?.status === 502 || error.response?.status === 504) {
      console.log('Service unavailable');
    }
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 404) {
      return [];
    } else if (error.response?.status === 500) {
      console.log('Unexpected error occurs');
    }
  }
);

export default axios;
