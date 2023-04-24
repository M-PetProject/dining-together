import axios from 'axios';
import { getSession } from '../util/cm_util';

// axios 설정
axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

// 요청 인터셉터 추가
axios.interceptors.request.use(
  function (config) {
    config.headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    };

    const token = getSession('token');
    // 미로그인 시
    if (token) {
      const { accessToken, refreshToken } = JSON.parse(token);
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      config.headers['refreshToken'] = `Bearer ${refreshToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const axiosModule = axios;
