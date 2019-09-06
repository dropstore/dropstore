import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';

const receiveAddress = createAction('RECEIVE_ADDRESS');

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
      is_default,
    };
    request('/user/add_address', { params }).then(() => {
      dispatch(fetchAddress());
      resolve();
    });
  });
}

function delAddress(id) {
  return dispatch => new Promise((resolve) => {
    request('/user/del_address', { params: { id } }).then(() => {
      dispatch(fetchAddress());
      resolve();
    });
  });
}

function editAddress(address, link_name, mobile, is_default, id) {
  return dispatch => new Promise((resolve) => {
    const params = {
      address,
      link_name,
      mobile,
      is_default,
      id,
    };
    request('/user/edit_address', { params }).then(() => {
      dispatch(fetchAddress());
      resolve();
    });
  });
}

export {
  receiveAddress, fetchAddress, addAddress, delAddress, editAddress,
};
