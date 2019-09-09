import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';

const receiveOrderStateList = createAction('RECEIVE_ORDER_STATE_LIST', a => a, (a, type) => ({ type }));
const resetOrderStateList = createAction('RESET_ORDER_STATE_LIST');
const requestOrderStateList = createAction('REQUEST_ORDER_STATE_LIST');
const removeOrderStateListItem = createAction('REMOVE_ORDER_STATE_LIST_ITEM', a => a, (a, type) => ({ type }));

function fetchOrderStateList(api, query, type, fetchMore = false) {
  return (dispatch, getState) => {
    const orderState = getState().orderState[type] || {};
    if (orderState.isFetching || (orderState.currentPage >= orderState.totalPages && fetchMore)) {
      return;
    }
    if (!fetchMore) {
      dispatch(resetOrderStateList(type));
    }
    const page = fetchMore ? orderState.currentPage + 1 : 1;
    const params = {
      ...query,
      limit: 10,
      pn: page,
    };
    dispatch(requestOrderStateList(type));
    request(api, { params }).then((res) => {
      dispatch(receiveOrderStateList({ ...res.data, currentPage: page }, type));
    });
  };
}

export {
  fetchOrderStateList, receiveOrderStateList, resetOrderStateList, requestOrderStateList, removeOrderStateListItem,
};
