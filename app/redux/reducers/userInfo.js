import { handleActions } from 'redux-actions';
import {
  receiveAuth, setMessageSendFlag, receiveUser, receiveIosNativeDeviceId, resetUser,
} from '../actions/userInfo';

const initialState = {
  user_s_id: null,
  uid: null,
  wechat_open_id: null,
  wechat_union_id: null,
  messageSendSuccess: false,
  sendTime: 0,
  iosNativeDeviceId: null,
  profile_image: null,
  nickname: null,
  gender: null,
  phone: null,
  name: null,
  level: null,
  checkout_times: null,
  sendPhone: null,
  guan_list: '',
};

export default handleActions({
  [receiveAuth]: (state, action) => ({ ...state, auth_token: action.payload.auth_token }),

  [setMessageSendFlag]: (state, action) => ({
    ...state,
    sendTime: action.payload.sendTime || state.sendTime,
    sendPhone: action.payload.sendPhone || state.sendPhone,
  }),

  [receiveUser]: (state, action) => ({ ...state, ...action.payload }),

  [resetUser]: state => ({
    ...state,
    auth_token: null,
    wechat_open_id: null,
    wechat_union_id: null,
    messageSendSuccess: false,
    sendTime: 0,
    profile_image: null,
    nickname: null,
    gender: null,
    name: null,
    phone: null,
    level: null,
    checkout_times: null,
  }),

  [receiveIosNativeDeviceId]: (state, action) => ({ ...state, iosNativeDeviceId: action.payload }),
}, initialState);
