import axios from 'axios';
import qs from 'qs';
import router from '../router'
import { getLocal } from './util'

// axios 配置
axios.defaults.timeout = 10000;
/*线上的走api.xrjinrong.com，公司开发走www.zzdd.com*/
//axios.defaults.baseURL = 'http://api.xrjinrong.com/backend';
//axios.defaults.baseURL = 'http://172.18.0.91/backend';
axios.defaults.baseURL = 'http://www.zzdd.com/backend';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = getLocal('token');
    const path = getLocal('path');

    config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    //判断token是否存在
    if (token) {
      //config.headers['TOKEN'] = token; //上线时要改
    }else{
      if(path === '/login'){
        router.push({path: '/login'});
      }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);


// http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.status === 9) {
      router.push({
        path: '/notfind'
      });
    }
    return response;
  },
  error => {
    // if (error.response) {
    //     switch (error.response.status) {
    //         case 401:
    //             // 401 清除token信息并跳转到登录页面
    //             store.commit(types.LOGOUT);
    //             router.replace({
    //                 path: 'login',
    //                 query: {redirect: router.currentRoute.fullPath}
    //             })
    //     }
    // }
    return Promise.reject(error.response.data)
  });

export default axios;

/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url, params = {}) {

  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data))
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}
