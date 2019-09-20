import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';
import api from '../../http/api';

const receiveSimpleData = createAction('RECEIVE_SIMPLE_DATA', a => a, (a, type) => ({ type }));
const requestSimpleData = createAction('REQUEST_SIMPLE_DATA');

function fetchSimpleData(type = '', query = {}) {
  return (dispatch, getState) => {
    if (JSON.stringify(query) === JSON.stringify((getState().simpleData[type] || {}).fetchedParams)) { return; }
    dispatch(requestSimpleData(type));
    const params = {
      ...api[type].initParams,
      ...query,
    };
    request(api[type].url, { params }).then((res) => {
      dispatch(receiveSimpleData({ data: res.data, fetchedParams: query }, type));
    });
  };
}

export { fetchSimpleData, receiveSimpleData, requestSimpleData };
