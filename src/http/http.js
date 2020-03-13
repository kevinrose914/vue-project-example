import axios from 'axios';
import TokenClass from './token';
/* eslint-disable */
import store from '../store/index';
import Router from '../router/index';

const service = axios.create({
  baseURL: __API_HOST__, // api的base_url
  timeout: 10000, // request timeout
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus: status => (status >= 200 && status < 300) || status === 401 || status === 403,
});


function handleError(err) {
}

service.interceptors.request.use((config) => {
  const cacheConfig = { ...config };
  /** 设置请求头 */
  if (cacheConfig.config && cacheConfig.config.headers) {
    cacheConfig.headers = {
      ...cacheConfig.headers,
      ...cacheConfig.config.headers,
    };
    delete cacheConfig.config.headers;
  }
  /** 增加token */
  const {
    token: Token,
  } = TokenClass.getToken() || {};
  if (Token) {
    cacheConfig.headers.Authorization = Token;
  }
  return cacheConfig;
}, error => Promise.reject(error));

service.interceptors.response.use((response) => {
  const { status } = response;
  switch (true) {
    case (status >= 200 && status < 300):
      return response.data;
    case (status === 401):
      console.error('登陆已失效！');
      // 可以选择刷新token
      return;
    case (status === 403):
      store.dispatch('logout', () => {
        Router.push('/login');
      });
      break;
    default:
      break;
  }
  return '';
}, (error) => {
  if (error && error.response && error.response.status >= 500) {
    return Promise.reject({
      error_description: '服务器错误!',
      status: error.response.status,
    });
  } else {
    const errorP = handleError(error);
    return Promise.reject(errorP);
  }
});


export default service;
