import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';

const receiveMoneyStream = createAction('RECEIVE_MONEY_STREAM');
const requestMoneyStream = createAction('REQUEST_MONEY_STREAM');
const resetMoneyStream = createAction('RESET_MONEY_STREAM');

function fetchMoneyStream(fetchMore = false) {
  return (dispatch, getState) => {
    const moneyStream = getState().moneyStream || {};
    if (moneyStream.isFetching || (moneyStream.currentPage >= moneyStream.totalPages && fetchMore)) {
      return;
    }
    if (!fetchMore) {
      dispatch(resetMoneyStream());
    }
    const page = fetchMore ? moneyStream.currentPage + 1 : 1;
    const params = {
      limit: 10,
      pn: page,
    };
    dispatch(requestMoneyStream());
    request('/user/user_balance', { params }).then((res) => {
      dispatch(receiveMoneyStream({ ...res.data, currentPage: page }));
    });
  };
}

export {
  fetchMoneyStream, receiveMoneyStream, requestMoneyStream, resetMoneyStream,
};
