import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';

const receiveMessage = createAction('RECEIVE_MESSAGE', a => a, (a, type) => ({ type }));
const requestMessage = createAction('REQUEST_MESSAGE');
const resetMessage = createAction('RESET_MESSAGE');

function fetchMessage(type, fetchMore = false) {
  return (dispatch, getState) => {
    if (getState().message[type].isFetching) {
      return;
    }
    if (!fetchMore) {
      dispatch(resetMessage(type));
    }
    dispatch(requestMessage(type));
    request('/user/userinfo', { params: { page: 1 } }).then((res) => {
      dispatch(receiveMessage(res.data, type));
    });
  };
}

export {
  fetchMessage, receiveMessage, requestMessage, resetMessage,
};
