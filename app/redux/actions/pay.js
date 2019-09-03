import {request} from '../../http/Axios';
// import {createAction} from 'redux-actions';
//
// const requestActivityList = createAction('REQUEST_ACTIVITY_LIST');
// const receiveActivityList = createAction('RECEIVE_ACTIVITY_LIST');
// const resetActivityList = createAction('RESET_ACTIVITY_LIST');
// const notReceiveActivityList = createAction('NOT_RECEIVE_ACTIVITY_LIST');


/**
 * 获取订单信息
 * @param order_id
 * @returns {Promise<*>}
 */
const getOrderInfo = async (order_id) => {
  const params = {
    order_id: order_id,
  };
  try {
    return await request('/pay/getAlipayOrder', {params, isShowLoading: true});
  } catch (e) {
  }
};
export {
  getOrderInfo
}
