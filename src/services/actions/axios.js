const axios = require('axios');

const API = process.env.NEXT_PUBLIC_API_URL;
const instance = axios.create({
  baseURL: API,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = instance;