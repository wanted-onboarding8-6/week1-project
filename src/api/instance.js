import axios from 'axios';

export const auth = axios.create({
  baseURL: process.env.REACT_APP_AUTH_URL,
});

auth.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    config.headers['Authorization'] = null;
  } else {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});
