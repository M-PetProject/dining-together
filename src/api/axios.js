import axios from 'axios';

// axios 설정
axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

// 요청 인터셉터 추가
axios.interceptors.request.use(
  function (config) {
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

export const axiosModule = createAxiosModule();

function createAxiosModule() {
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      // , 'Authorization': 'Bearer ' + nvl(getSession('t'))
    },
  });
}
