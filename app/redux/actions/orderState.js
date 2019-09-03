import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';

const receiveOrderStateList = createAction('RECEIVE_ORDER_STATE_LIST', a => a, (a, type) => ({ type }));
const resetOrderStateList = createAction('RESET_ORDER_STATE_LIST');
const requestOrderStateList = createAction('REQUEST_ORDER_STATE_LIST');
const removeOrderStateListItem = createAction('REMOVE_ORDER_STATE_LIST_ITEM', a => a, (a, type) => ({ type }));

function fetchOrderStateList(type, fetchMore = false) {
  return (dispatch, getState) => {
    if ((getState().orderState[type] || {}).isFetching) {
      return;
    }
    if (!fetchMore) {
      dispatch(resetOrderStateList(type));
    }
    const params = {

    };
    dispatch(requestOrderStateList(type));
    request('/user/userinfo', { params }).then((res) => {
      dispatch(receiveOrderStateList(res.data, type));
    });
  };
}

export {
  fetchOrderStateList, receiveOrderStateList, resetOrderStateList, requestOrderStateList, removeOrderStateListItem,
};
