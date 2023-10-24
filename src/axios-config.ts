import axios from 'axios';

export const EPISODES = 'episode/search';
export const DEFAULT_PAGE_SIZE = 20;

axios.defaults.baseURL = 'https://stapi.co/api/v1/rest/';

export default axios;
