/**
 * @file 网络请求封装
 * @date 2019/8/17 15:59
 * @author ZWW
 */

'use strict';
import {isConnected} from '../utils/NetUtil';
import {showToast, showToastLoading, hideToastLoading} from '../utils/MutualUtil';
import Strings from '../res/Strings';
import Axios from 'axios';

export const timeout = 10000;
/**
 * 自定义Axios实例默认值
 * @type {AxiosInstance}
 */
const axiosInstance = Axios.create({
  timeout: timeout,
});

// 允许携带请求头
axiosInstance.defaults.withCredentials = true;
// 网络请求前处理
axiosInstance.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

// 网络返回处理
axiosInstance.interceptors.response.use(
  res => res,
  // 在拦截器里处理超时错误会有问题，reject给使用者
  error => Promise.reject(error),
);

/**
 * 发送请求
 * @param {String} url
 * @param {Boolean} isShowLoading - 是否显示加载框
 * @param {String} loadingText - 加载框文字
 * @param {String} method - 请求方式 ex:post、get
 * @param {Object} params - 请求体
 * @param {Number} timeout - 超时时间
 * @returns {Promise<*>}
 */
const request = async (url, {isShowLoading = true, loadingText = '加载中...', method = 'post', params = Object, timeout = timeout}) => {
  if (!await isConnected()) {
    showToast(Strings.netError);
    throw `NETWORK IS UNCONNECTED------url:${url}`;
  }
  if (isShowLoading) {
    showToastLoading({text: loadingText, duration: timeout});
  }
  let response;
  try {
    if (method === 'post') {
      response = await axiosInstance.post(url, params, {method: method, timeout: timeout});
    } else {
      response = await axiosInstance.get(url, {method: method, params: params, timeout: timeout});
    }
    if (response.status >= 200 && response.status < 400) {
      return response.data;
    }
  } catch (error) {
    // 获取到响应拦截器里返回的的error
    if (error.code === 'ECONNABORTED' && error.request._response === 'timeout') {// 请求超时
      showToast(Strings.connectTimeout);
      throw Strings.connectTimeout;
    } else {
      if (error.response) {
        return error.response.data;
      }
      throw `ERROR TO REQUEST------URL:${url}-------ERROR:${error}`;
    }
  } finally {
    if (isShowLoading) {
      hideToastLoading();
    }
  }
};
export {axiosInstance, request};
