// utils/axiosConfig.js
import axios from 'axios';

const HTTP_REQUEST = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

HTTP_REQUEST.interceptors.request.use(
  config => {
    // You can modify the config here if needed (e.g., add authorization headers)
    return config;
  },
  error => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

HTTP_REQUEST.interceptors.response.use(
  response => {
    // Any status code within the range of 2xx causes this function to trigger
    return response;
  },
  error => {
    // Any status codes outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
  }
);

export default HTTP_REQUEST;
