/**
 * @file 网络请求封装
 * https://github.com/axios/axios
 * @date 2019/8/17 15:59
 * @author ZWW
 */
import Axios from 'axios';
import qs from 'qs';
import { isConnected } from '../utils/NetUtil';
import { showToast, showToastLoading, hideToastLoading } from '../utils/MutualUtil';
import Strings from '../res/Strings';
import { sortObj } from '../utils/SortUtil';
import { md5 } from '../utils/Md5Util';
import { store } from '../router/Router';

const baseURL = 'http://api.dropstore.cn';
const timeout = 10000;
const Authheaders = ()=>({
      Authorization: store.getState().userInfo.user_s_id,
});



/**
 * 自定义Axios实例默认值
 * @type {AxiosInstance}
 */
const axiosInstance = Axios.create({
  timeout,
});
axiosInstance.defaults.baseURL = baseURL;
// 允许携带请求头
axiosInstance.defaults.withCredentials = true;
// 默认超时时间
axiosInstance.defaults.timeout = timeout;
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
 * 除了url，其他都是可选参数;结合实际业务，可提出部分可选参数为必传参数，如：params
 * @param {String} url
 * @param {Boolean} isShowLoading - 是否显示加载框
 * @param {String} loadingText - 加载框文字
 * @param {String} method - 请求方式 ex:post、get
 * @param {Object} params - 请求体
 * @param {Number} timeout - 超时时间
 * @returns {Promise<*>}
 */

const request = async (url, {
  isShowLoading = false,
  loadingText = '加载中...',
  method = 'post',
  params = Object,
  type = 'json',//默认是post下的formdata请求方式，可以换做post方式下的json方式

} = {}) => {
  if (!await isConnected()) {
    showToast(Strings.netError);
    throw new Error(`NETWORK IS UNCONNECTED------url:${url}`);
  }
  if (isShowLoading) {
    showToastLoading({ text: loadingText, duration: timeout });
  }
  let response;
  try {
    const data = { ...params, timestamp: Date.now() };

    if(method === 'post' && type === 'form'){//form方式请求
      response = await axiosInstance({
        url,
        method: 'post',
        headers:{'Content-Type': 'application/x-www-form-urlencoded',...Authheaders()},
        data: qs.stringify({ ...data, token: md5(encodeURIComponent(sortObj(data))) }),
      });
    }else if (method === 'post' && type === 'json'){//json方式请求
      response = await axiosInstance({
        url,
        method: 'post',
        headers:{'Content-Type': 'application/json',...Authheaders()},
        data: { ...data, token: md5(encodeURIComponent(sortObj(data)))},
      });
    }else if (method === 'get'){//get方式请求
      response = await axiosInstance({
        url,
        method: 'get',
        headers:Authheaders(),
        params: { ...data, token: md5(encodeURIComponent(sortObj(data))) },
      });
    }


    if (response.status >= 200 && response.status < 400) {
      if (response.data.callbackCode === 1) {
        return response.data;
      }
      console.log(response.data);
      showToast(response.data.callbackMsg);
      throw new Error(response.data.callbackMsg);
    }
  } catch (error) {
    // 获取到响应拦截器里返回的的error
    if (error.response) {
      showToast(error.response.data.callbackMsg);
      return error.response.data;
    }
    // 请求超时
    if (error.code === 'ECONNABORTED' && error.request._response === 'timeout') {
      showToast(Strings.connectTimeout);
      throw new Error(`CONNECT TIMEOUT------URL:${url}------ERROR:${error}`);
    }
    throw new Error(`ERROR TO REQUEST------URL:${url}------ERROR:${error}`);
  } finally {
    if (isShowLoading) {
      hideToastLoading();
    }
  }
};

export { axiosInstance, timeout, request };
