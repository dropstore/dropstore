import { handleActions } from 'redux-actions';
import {
  receiveAuth, setMessageSendFlag, receiveUser, receiveIosNativeDeviceId, resetUser,
} from '../actions/userInfo';

const initialState = {
};

export default handleActions({
  [receiveAuth]: (state, action) => ({ ...state, auth_token: action.payload.auth_token }),

  [setMessageSendFlag]: (state, action) => ({
    ...state,
    sendTime: action.payload.sendTime || state.sendTime,
    sendPhone: action.payload.sendPhone || state.sendPhone,
  }),

  [receiveUser]: (state, action) => ({ ...state, ...action.payload }),

  [resetUser]: () => ({}),

  [receiveIosNativeDeviceId]: (state, action) => ({ ...state, iosNativeDeviceId: action.payload }),
}, initialState);
