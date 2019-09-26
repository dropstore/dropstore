import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';
import api from '../../http/api';

const receiveSimpleData = createAction('RECEIVE_SIMPLE_DATA', a => a, (a, type) => ({ type }));
const requestSimpleData = createAction('REQUEST_SIMPLE_DATA');
const resetAllSimpleData = createAction('RESET_ALL_SIMPLE_DATA');

function fetchSimpleData(type = '', query = {}, refresh = false) {
  return (dispatch, getState) => new Promise((resolve) => {
    if (!refresh && JSON.stringify(query) === JSON.stringify((getState().simpleData[type] || {}).fetchedParams)) { return; }
    dispatch(requestSimpleData(type));
    const params = {
      ...api[type].initParams,
      ...query,
    };
    request(api[type].url, { params }).then((res) => {
      dispatch(receiveSimpleData({ data: res.data, fetchedParams: query }, type));
      resolve();
    });
  });
}

export {
  fetchSimpleData, receiveSimpleData, requestSimpleData, resetAllSimpleData,
};
