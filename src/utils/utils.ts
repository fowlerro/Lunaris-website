import axios from 'axios';

export const fetcher = (url: string) => axios(url, { withCredentials: true });
