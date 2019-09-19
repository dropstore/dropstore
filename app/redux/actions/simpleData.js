import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';
import api from '../../http/api';

const receiveSimpleData = createAction('RECEIVE_SIMPLE_DATA', a => a, (a, type) => ({ type }));
const requestSimpleData = createAction('REQUEST_SIMPLE_DATA');

function fetchSimpleData(type = '', query = {}) {
  return (dispatch) => {
    const params = {
      ...api[type].initParams,
      ...query,
    };
    dispatch(requestSimpleData(type));
    request(api[type].url, { params }).then((res) => {
      dispatch(receiveSimpleData(res.data, type));
    });
  };
}

export { fetchSimpleData, receiveSimpleData, requestSimpleData };
