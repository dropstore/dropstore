import {request} from '../../http/Axios';
import {alipayModule} from "../../native/module";
import ShopConstant from "../../common/ShopConstant";
// import {createAction} from 'redux-actions';
//
// const requestActivityList = createAction('REQUEST_ACTIVITY_LIST');
// const receiveActivityList = createAction('RECEIVE_ACTIVITY_LIST');
// const resetActivityList = createAction('RESET_ACTIVITY_LIST');
// const notReceiveActivityList = createAction('NOT_RECEIVE_ACTIVITY_LIST');

/**
 * 获取支付佣金信息并调用支付
 * @param type
 * @param u_a_id
 * @returns {Promise<*>}
 */
const getCommisionInfo = async (type, u_a_id) => {
  const params = {
    u_a_id: u_a_id,
  };
  try {
    let res = await request('/pay/getAlipayActivity', {params, isShowLoading: true});
    let data = res.data;
    if (data) {
      let payRes = await pay(type, data);
      console.log(payRes)
      // TODO：调用后端异步通知接口判断支付状态
    }
  } catch (e) {
  }
};
/**
 * 获取订单信息
 * @param type
 * @param order_id
 * @returns {Promise<*>}
 */
const getOrderInfo = async (type, order_id) => {
  const params = {
    order_id: order_id,
  };
  try {
    let res = await request('/pay/getAlipayOrder', {params, isShowLoading: true});
    let data = res.data;
    if (data) {
      let payRes = await pay(type, data);
      console.log(payRes)
    }
  } catch (e) {
  }
};

const pay = async (type, data) => {
  if (type === ShopConstant.ALIPAY) {
    let res = await alipayModule.pay(data);
    if (res) {
      alert(JSON.stringify(res));
    }
  }
};
export {
  getCommisionInfo,
  getOrderInfo,
  pay
}
