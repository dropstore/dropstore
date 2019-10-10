import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';
import api from '../../http/api';

const receiveSimpleData = createAction('RECEIVE_SIMPLE_DATA', a => a, (a, type) => ({ type }));
const requestSimpleData = createAction('REQUEST_SIMPLE_DATA', a => a, (a, needClear) => ({ needClear }));
const resetAllSimpleData = createAction('RESET_ALL_SIMPLE_DATA');

function fetchSimpleData(type = '', query = {}, fetchType: 'reload' | 'refresh' = null) {
  return (dispatch, getState) => new Promise((resolve) => {
    if (!fetchType && JSON.stringify(query) === JSON.stringify((getState().simpleData[type] || {}).fetchedParams)) { return; }
    dispatch(requestSimpleData(type, fetchType === 'reload'));
    const params = {
      ...api[type].initParams,
      ...query,
    };
    request(api[type].url, { params }).then((res) => {
      dispatch(receiveSimpleData({ data: res.data, fetchedParams: query }, type));
      resolve(res.data);
    });
  });
}

export {
  fetchSimpleData, receiveSimpleData, requestSimpleData, resetAllSimpleData,
};
