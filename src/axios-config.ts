import axios from 'axios';

export const EPISODES_SEARCH_URI = 'episode/search';
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE_NUMBER = 0;

axios.defaults.baseURL = 'https://stapi.co/api/v1/rest/';

export default axios;
