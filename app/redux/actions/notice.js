import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';

const receiveNotice = createAction('RECEIVE_NOTICE', a => a, (a, type) => ({ type }));
const requestNotice = createAction('REQUEST_NOTICE');
const resetNotice = createAction('RESET_NOTICE');

function fetchNotice(api, type, fetchMore = false) {
  return (dispatch, getState) => {
    const notice = getState().notice[type] || {};
    if (notice.isFetching || (notice.currentPage >= notice.totalPages && fetchMore)) {
      return;
    }
    if (!fetchMore) {
      dispatch(resetNotice(type));
    }
    const page = fetchMore ? notice.currentPage + 1 : 1;
    const params = {
      limit: 10,
      pn: page,
    };
    dispatch(requestNotice(type));
    request(api, { params }).then((res) => {
      dispatch(receiveNotice({ ...res.data, currentPage: page }, type));
    });
  };
}

export {
  fetchNotice, receiveNotice, requestNotice, resetNotice,
};
