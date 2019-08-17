import {createAction} from 'redux-actions';
import axios from 'axios';
import {request} from '../../http/Axios';

const requestVendors = createAction('REQUEST_VENDORS');
const receiveVendors = createAction('RECEIVE_VENDORS');
const resetVendors = createAction('RESET_VENDORS');

function fetchVendors(fetchNextPage = false) {
  return (dispatch, getState) => {
    const vendors = getState().test.vendors;
    const page = fetchNextPage ? vendors.currentPage + 1 : 1;

    page === 1 && dispatch(resetVendors());

    const path = 'https://api-staging.waitwaitpay.com/api/vendors/nearby';
    const params = {
      with_vouchers: false,
      latitude: '40.0919',
      longitude: '116.35223',
      page,
      type: 'quick',
      discount_only: true,
      request_id: -1,
    };
    dispatch(requestVendors());
    request(path, {method: 'get', params: params}).then((res) => {
      dispatch(receiveVendors(res.result));
    }).catch(error => alert(error));
    // return axios.get(path, { params }).then((res) => {
    //   dispatch(receiveVendors(res.data.result));
    // }).catch(error => console.log(error));
  };
}

export {
  requestVendors, receiveVendors, resetVendors, fetchVendors,
};
