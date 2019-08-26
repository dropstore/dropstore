import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';
import AuthUtil from '../../utils/AuthUtil';
import { showToast } from '../../utils/MutualUtil';

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
      }[wxRes.gender];
      const params = {
        unionid: wxRes.unionid,
        openid: wxRes.openid,
        avatar: wxRes.iconurl,
        sex,
        user_name: wxRes.name,
      };
      request('user/wx_login', { params }).then((res) => {
        if (parseInt(res.data.size) > 0) {
          dispatch(receiveUser(res.data));
          resolve(true);
        } else {
          dispatch(receiveUser({
            user_s_id: res.data.user_s_id,
            user_name: wxRes.name,
            sex,
            avatar: wxRes.iconurl,
          }));
          resolve(false);
        }
      });
    }).catch(() => {
      showToast('登录失败，请重新登录');
    });
  });
}

// 发送验证码
function sendMessage(mobile, sendTime = 0) {
  return dispatch => new Promise((resolve) => {
    request('/user/send_message', { params: { mobile } }).then(() => {
      dispatch(setMessageSendFlag({ sendTime, sendPhone: mobile }));
      resolve();
    }).catch(() => {
      dispatch(setMessageSendFlag({ sendTime: 0, sendPhone: '' }));
    });
  });
}

// 短信登录
function messageAuth(mobile, codes) {
  return dispatch => new Promise((resolve) => {
    request('/user/login', { params: { mobile, codes } }).then((res) => {
      if (res.data.user_name) {
        dispatch(receiveUser(res.data));
        resolve(true);
      } else {
        dispatch(receiveUser({ ...res.data, mobile }));
        resolve(false);
      }
    });
  });
}

// 请求用户信息数据
function fecthUser(user, type = 'GET') {
  return (dispatch, getState) => {
    const auth_token = getState().userInfo.auth_token;
    let params = { method: type };
    if (type === 'PUT') {
      params = {
        method: type,
        body: JSON.stringify({ user: { auth_token, ...user } }),
      };
    }
    // return fetchData('/api/user', params).then((json) => {
    //   if (json.status === 'ok') {
    //     dispatch(receiveUser({ ...json.result.user, auth_token }));
    //   } else {
    //     dispatch(resetUser());
    //   }
    // }).catch(() => dispatch(resetUser()));
  };
}

// 更新用户信息
function updateUser(params) {
  return dispatch => new Promise((resolve) => {
    request('/user/n_register', { params }).then((res) => {
      dispatch(receiveUser(res.data));
      resolve();
    });
  });
}

export {
  receiveAuth, sendMessage, setMessageSendFlag, messageAuth, updateUser,
  fecthUser, receiveUser, receiveIosNativeDeviceId, weChatAuth, resetUser,
};
