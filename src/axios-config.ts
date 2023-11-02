import axios, { AxiosError } from 'axios';

export const SEARCH_URI = 'beers/';
export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PER_PAGE = 20;
export const PER_PAGE_OPTIONS = [20, 40, 60, 80];
const THROTTLING = 300;

const sleep = (delay: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = 'https://api.punkapi.com/v2/';

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
  async (response) => {
    await sleep(THROTTLING);
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 404) {
      return error.response;
    } else if (error.response?.status === 500) {
      console.log('Unexpected error occurs');
    }
  }
);

export default axios;
