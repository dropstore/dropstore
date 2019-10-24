import { createAction } from 'redux-actions';
import AsyncStorage from '@react-native-community/async-storage';
import { request } from '../../http/Axios';
import AuthUtil from '../../utils/AuthUtil';
import { showToast } from '../../utils/MutualUtil';
import { resetAllSimpleData } from './simpleData';

const receiveAuth = createAction('RECEIVE_AUTH');
const setMessageSendFlag = createAction('SET_MESSAGE_SEND_FLAG');
const receiveUser = createAction('RECEIVE_USER');
const resetUser = createAction('RESET_USER');
const receiveIosNativeDeviceId = createAction('RECEIVE_IOS_NATIVE_DEVICE_ID');

// 微信登录
function weChatAuth(i) {
  return dispatch => new Promise((resolve) => {
    AuthUtil(i).then((wxRes) => {
      const sex = {
        男: 1,
        女: 2,
        1: 1,
        2: 2,
        0: -1,
      }[wxRes.gender];
      const params = {
        unionid: wxRes.unionid,
        openid: wxRes.openid,
      };
      request('user/wx_login', { params }).then((res) => {
        if (res?.data?.user_s_id) {
          AsyncStorage.setItem('token', res.data.user_s_id);
          dispatch(receiveUser(res.data));
          resolve(true);
        } else {
          dispatch(receiveUser({
            user_s_id: res.data.user_s_id,
            user_name: wxRes.name,
            sex,
            avatar: wxRes.iconurl,
            unionid: wxRes.unionid,
            openid: wxRes.openid,
          }));
          resolve(false);
        }
      });
    }).catch(() => {
      showToast('登录失败，请重新登录');
    });
  });
}

// 手机绑定微信
function weChatBind(i) {
  return dispatch => new Promise((resolve) => {
    AuthUtil(i).then((wxRes) => {
      const params = {
        unionid: wxRes.unionid,
        openid: wxRes.openid,
      };
      request('/user/up_wx', { params }).then(() => {
        dispatch(receiveUser({ wx_openid: wxRes.openid, wx_unionid: wxRes.unionid }));
        resolve();
      });
    }).catch(() => {
      showToast('绑定失败，请稍后重试');
    });
  });
}

// 微信绑定手机号
function wxBindMobile(mobile, codes) {
  return (dispatch, getState) => new Promise((resolve) => {
    const {
      sex, user_name, avatar, unionid, openid,
    } = getState().userInfo;
    request('/user/do_set_wx', {
      params: {
        mobile, codes, unionid, openid, user_name, avatar, sex,
      },
    }).then((res) => {
      dispatch(receiveUser({
        user_s_id: res.data.user_s_id,
      }));
      resolve();
    });
  });
}

// 手机号换绑
function mobileBind(mobile, codes) {
  return () => new Promise((resolve) => {
    request('/user/up_mobile', { params: { mobile, codes } }).then(() => {
      resolve();
    });
  });
}

// 发送验证码
function sendMessage(api, mobile, sendTime = 0) {
  return dispatch => new Promise((resolve, reject) => {
    request(api, { params: { mobile } }).then(() => {
      dispatch(setMessageSendFlag({ sendTime, sendPhone: mobile }));
      resolve();
    }).catch(() => {
      dispatch(setMessageSendFlag({ sendTime: 0, sendPhone: '' }));
      reject();
    });
  });
}

// 短信登录
function messageAuth(mobile, codes) {
  return dispatch => new Promise((resolve) => {
    request('/user/login', { params: { mobile, codes } }).then((res) => {
      if (res.data.user_name) {
        AsyncStorage.setItem('token', res.data.user_s_id);
        dispatch(receiveUser(res.data));
        resolve(true);
      } else {
        dispatch(receiveUser({ ...res.data, mobile }));
        resolve(false);
      }
    });
  });
}

// 更新用户信息
function updateUser(params) {
  return (dispatch, getState) => new Promise((resolve) => {
    const {
      sex: sexState, age, size, user_name, avatar,
    } = getState().userInfo;
    const sex = {
      男: 1,
      女: 2,
      1: 1,
      2: 2,
      0: -1,
    }[sexState];
    request('/user/n_register', {
      params: {
        sex, age, size, user_name, avatar, ...params,
      },
    }).then((res) => {
      dispatch(receiveUser(res.data));
      resolve();
    });
  });
}

// 获取用户信息
function getUser() {
  return dispatch => new Promise((resolve) => {
    request('/user/userinfo', { params: { uid: -1 } }).then((res) => {
      dispatch(receiveUser(res.data));
      resolve();
    });
  });
}

// 退出登录
function logout() {
  return (dispatch) => {
    AsyncStorage.removeItem('token');
    dispatch(resetUser());
    dispatch(resetAllSimpleData());
  };
}

// 创建支付密码
function setPassword(password) {
  return dispatch => new Promise((resolve) => {
    const params = {
      password,
      enter_password: password,
    };
    request('/user/p_register', { params }).then(() => {
      dispatch(receiveUser({ password: true }));
      resolve();
    });
  });
}

// 修改支付密码
function updatePassword(password, new_password) {
  return dispatch => new Promise((resolve) => {
    const params = {
      new_password,
      new_enter_password: new_password,
      password,
    };
    request('/user/change_password', { params }).then(() => {
      dispatch(receiveUser({ password: true }));
      resolve();
    });
  });
}

export {
  receiveAuth, sendMessage, setMessageSendFlag, messageAuth, updateUser, getUser,
  receiveUser, receiveIosNativeDeviceId, weChatAuth, resetUser, weChatBind, logout,
  setPassword, updatePassword, mobileBind, wxBindMobile,
};
