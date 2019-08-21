import { handleActions } from 'redux-actions';
import {
  receiveAuth, setMessageSendFlag, receiveUser, receiveIosNativeDeviceId, resetUser,
} from '../actions/userInfo';

const initialState = {
  auth_token: null,
  wechat_open_id: null,
  wechat_union_id: null,
  messageSendSuccess: false,
  sendTime: 0,
  errorMessage: null,
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
  [receiveAuth]: (state, action) => ({ ...state, auth_token: action.payload.auth_token, errorMessage: action.payload.errorMessage }),

  [setMessageSendFlag]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
    sendTime: action.payload.sendTime || state.sendTime,
    sendPhone: action.payload.sendPhone || state.sendPhone,
  }),

  [receiveUser]: (state, action) => ({ ...state, ...action.payload, errorMessage: null }),

  [resetUser]: state => ({
    ...state,
    auth_token: null,
    wechat_open_id: null,
    wechat_union_id: null,
    messageSendSuccess: false,
    sendTime: 0,
    errorMessage: null,
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
