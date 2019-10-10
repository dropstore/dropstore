import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';

const receiveAddress = createAction('RECEIVE_ADDRESS');
const setChoosedAddress = createAction('SET_CHOOSED_ADDRESS');

function fetchAddress() {
  return (dispatch) => {
    request('/user/user_address', { params: { type: 1 } }).then((res) => {
      dispatch(receiveAddress(res.data.list));
    });
  };
}

function addAddress(address, link_name, mobile, is_default = false) {
  return dispatch => new Promise((resolve) => {
    const params = {
      address,
      link_name,
      mobile,
      is_default: is_default ? '1' : '0',
    };
    request('/user/add_address', { params }).then((res) => {
      dispatch(receiveAddress(res.data));
      resolve();
    });
  });
}

function delAddress(id) {
  return dispatch => new Promise((resolve) => {
    request('/user/del_address', { params: { id } }).then((res) => {
      dispatch(receiveAddress(res.data));
      resolve();
    });
  });
}

function editAddress(address, link_name, mobile, is_default = false, id) {
  return dispatch => new Promise((resolve) => {
    const params = {
      address,
      link_name,
      mobile,
      is_default: is_default ? '1' : '0',
      id,
    };
    request('/user/edit_address', { params }).then((res) => {
      dispatch(receiveAddress(res.data));
      resolve();
    });
  });
}

export {
  receiveAddress, fetchAddress, addAddress, delAddress, editAddress, setChoosedAddress,
};
