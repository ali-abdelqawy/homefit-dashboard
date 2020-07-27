import axios from 'axios';
import { baseURL } from '../constants';

const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  async config => {
    const token = await localStorage.getItem('userToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
