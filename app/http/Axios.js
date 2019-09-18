/**
 * @file 网络请求封装
 * https://github.com/axios/axios
 * @date 2019/8/17 15:59
 * @author ZWW
 */
import Axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { showToast, showToastLoading, hideToastLoading } from '../utils/MutualUtil';
import Strings from '../res/Strings';
import { sortObj } from '../utils/SortUtil';
import { md5 } from '../utils/Md5Util';
import { store } from '../router/Router';

const baseURL = 'http://api.dropstore.cn';
let networkIsConnected = true;
const timeout = 5000;
const headers = header => ({
  ...header,
  Authorization: store.getState().userInfo.user_s_id,
});

// 监听网络变化
const netListener = NetInfo.addEventListener((state) => {
  networkIsConnected = state.isConnected;
});

// 移除网络监听
const removeNetListener = () => {
  netListener();
};

const axiosInstance = Axios.create({
  timeout,
});

/**
 * 发送请求
 * 除了url，其他都是可选参数;结合实际业务，可提出部分可选参数为必传参数，如：params
 * @param {String} url
 * @param {Boolean} isShowLoading - 是否显示加载框
 * @param {String} loadingText - 加载框文字
 * @param {String} method - 请求方式 ex:post、get
 * @param {Object} params - 请求体
 * @param {Number} timeout - 超时时间
 * @param type
 * @returns {Promise<*>}
 */

const request = async (url, {
  isShowLoading = false,
  loadingText = '加载中...',
  method = 'post',
  params = {},
  timeout = timeout,
  type = 'form',
} = {}) => {
  if (!networkIsConnected) {
    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
      showToast(Strings.netError);
      throw new Error(`NETWORK IS UNCONNECTED------url:${url}`);
    }
  }
  if (isShowLoading) {
    showToastLoading({ text: loadingText, duration: timeout });
  }
  let response;
  try {
    const data = { ...params, timestamp: Date.now() };
    response = await axiosInstance({
      url,
      method,
      timeout,
      headers: headers(),
      [type === 'form' ? 'params' : 'data']: { ...data, token: md5(encodeURIComponent(sortObj(data))) },
      baseURL,
    });
    if (response.status >= 200 && response.status < 400) {
      if (response.data.callbackCode === 1) {
        return response.data;
      }
      showToast(response.data.callbackMsg);
      throw new Error(response.data.callbackMsg);
    }
  } catch (error) {
    console.log(error);
    if (error.code === 'ECONNABORTED' && error.request._response === 'timeout') {
      showToast(Strings.connectTimeout);
    } else if (error.response) {
      if (error.response.status === 500) {
        showToast('服务器开了小差，请稍后再试');
      } else if (error.response.data.callbackMsg) {
        showToast(error.response.data.callbackMsg);
        return error.response.data;
      }
    }
    throw new Error(`ERROR TO REQUEST------URL:${url}------ERROR:${error}`);
  } finally {
    hideToastLoading();
  }
};

const upload = (url, data) => {
  const formdata = new FormData();
  data.timestamp = Date.now();
  for (const i in data) {
    if (i === 'avatar') {
      formdata.append('avatar', { uri: data[i], name: 'avatar.png', type: 'multipart/form-data' });
      delete data[i];
    } else {
      formdata.append(i, data[i]);
    }
  }
  formdata.append('token', md5(encodeURIComponent(sortObj(data))));
  return new Promise((resolve, reject) => {
    Axios.post(`${baseURL}${url}`, formdata, { headers: headers() }).then((res) => {
      if (res.data.callbackCode === 1) {
        resolve(res.data);
        return;
      }
      console.log(res.data);
      showToast(res.data.callbackMsg);
      throw new Error(res.data.callbackMsg);
    }).catch((err) => {
      reject(err);
    });
  });
};

export {
  timeout, request, upload, removeNetListener,
};
