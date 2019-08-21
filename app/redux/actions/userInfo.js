import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';

const receiveAuth = createAction('RECEIVE_AUTH');
const setMessageSendFlag = createAction('SET_MESSAGE_SEND_FLAG');
const receiveUser = createAction('RECEIVE_USER');
const resetUser = createAction('RESET_USER');
const receiveIosNativeDeviceId = createAction('RECEIVE_IOS_NATIVE_DEVICE_ID');

// 微信登录
function weChatAuth(wechat) {
  return dispatch => new Promise((resolve, reject) => {
    // fetchData(`/api/user?appid=wx8268a8058a81a2fe&code=${wechat.code}`, { method: 'POST' }).then((json) => {
    //   if (json.status === 'ok') {
    //     dispatch(receiveUser(json.result.user));
    //     resolve(true);
    //   } else {
    //     dispatch(setMessageSendFlag({ errorMessage: json.message }));
    //     reject(json);
    //   }
    // }).catch(err => reject(err));
  });
}

// 短信登录
function messageAuth(phone, code) {
  return dispatch => new Promise((resolve, reject) => {
    // fetchData(`/api/user?phone=${phone}&code=${code}`, { method: 'POST' }).then((json) => {
    //   if (json.status === 'ok') {
    //     dispatch(receiveUser(json.result.user));
    //     resolve(true);
    //   } else {
    //     dispatch(setMessageSendFlag({ errorMessage: json.message }));
    //     reject(json);
    //   }
    // }).catch(err => reject(err));
  });
}

// 发送验证码
function sendMessage(phone, sendTime = 0) {
  return dispatch => new Promise((resolve, reject) => {
    const params = {
      mobile: 17554265585,
    };
    request('/user/send_message', { params }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
    // fetchData(`/api/user/request_sms_code?phone=${phone}`).then((json) => {
    //   if (json.status === 'ok') {
    //     dispatch(setMessageSendFlag({ errorMessage: null, sendTime, sendPhone: phone }));
    //     resolve(true);
    //   } else {
    //     dispatch(setMessageSendFlag({ errorMessage: json.message, sendTime, sendPhone: phone }));
    //     reject(json);
    //   }
    // }).catch(err => reject(err));
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

export {
  receiveAuth, sendMessage, setMessageSendFlag, messageAuth,
  fecthUser, receiveUser, receiveIosNativeDeviceId, weChatAuth, resetUser,
};
