import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from './types';

const API = "http://localhost:5555";
const instance: AxiosInstance = axios.create({
  baseURL: API,
});

instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
