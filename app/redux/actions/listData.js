import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';
import api from '../../http/api';

const receiveListData = createAction('RECEIVE_LIST_DATA', a => a, (a, type) => ({ type }));
const requestListData = createAction('REQUEST_LIST_DATA');
const resetListData = createAction('RESET_LIST_DATA');

function fetchListData(type = '', query = {}, fetchMore = false) {
  return (dispatch, getState) => {
    const listData = getState().listData[type] || {};
    if (listData.isFetching || (listData.currentPage >= listData.totalPages && fetchMore)) {
      return;
    }
    if (!fetchMore) {
      dispatch(resetListData(type));
    }
    const page = fetchMore ? listData.currentPage + 1 : 1;
    const params = {
      ...api[type].initParams,
      pn: page,
      ...query,
    };
    dispatch(requestListData(type));
    request(api[type].url, { params }).then((res) => {
      dispatch(receiveListData({ ...res.data, currentPage: page }, type));
    });
  };
}

export {
  fetchListData, receiveListData, requestListData, resetListData,
};