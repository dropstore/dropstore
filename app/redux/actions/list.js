import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';
import api from '../../http/api';

const receiveList = createAction('RECEIVE_LIST', a => a, (a, type) => ({ type }));
const requestList = createAction('REQUEST_LIST');
const resetList = createAction('RESET_LIST');

function fetchList(type = '', query = {}, fetchMore = false) {
  return (dispatch, getState) => {
    const list = getState().list[type] || {};
    if (list.isFetching || (list.currentPage >= list.totalPages && fetchMore)) {
      return;
    }
    if (!fetchMore) {
      dispatch(resetList(type));
    }
    const page = fetchMore ? list.currentPage + 1 : 1;
    const params = {
      ...api[type].initParams,
      pn: page,
      ...query,
    };
    dispatch(requestList(type));
    request(api[type].url, { params }).then((res) => {
      dispatch(receiveList({ ...res.data, currentPage: page }, type));
    });
  };
}

export {
  fetchList, receiveList, requestList, resetList,
};
