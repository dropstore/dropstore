import {request} from '../../http/Axios';
import {alipayModule, wxPayModule} from "../../native/module";
import ShopConstant from "../../common/ShopConstant";
import {showToast} from "../../utils/MutualUtil";
import Strings from "../../res/Strings";
// import {createAction} from 'redux-actions';
//
// const requestActivityList = createAction('REQUEST_ACTIVITY_LIST');
// const receiveActivityList = createAction('RECEIVE_ACTIVITY_LIST');
// const resetActivityList = createAction('RESET_ACTIVITY_LIST');
// const notReceiveActivityList = createAction('NOT_RECEIVE_ACTIVITY_LIST');

/**
 * 获取支付佣金信息并调用支付
 * @param chooseWay - 支付方式
 * @param u_a_id
 * @returns {Promise<*>}
 */
const getCommisionInfo = async (chooseWay, u_a_id) => {
  const params = {
    u_a_id: u_a_id,
  };
  try {
    let res = await request('/pay/getAlipayActivity', {params, isShowLoading: true});
    let data = res.data;
    if (data) {
      return await pay(chooseWay, data);
    }
  } catch (e) {
  }
};

/**
 * 获取订单信息并调用支付
 * @param chooseWay
 * @param order_id
 * @returns {Promise<*>}
 */
const getOrderInfo = async (chooseWay, order_id) => {
  const params = {
    order_id: order_id,
  };
  try {
    let res = await request('/pay/getAlipayOrder', {params, isShowLoading: true});
    let data = res.data;
    if (data) {
      return await pay(chooseWay, data);
    }
  } catch (e) {
  }
};

/**
 * 支付
 * @param {Number} chooseWay - 支付方式
 * @param {Object} data - 支付信息
 * @returns {Promise<void>}
 */
const pay = async (chooseWay, data) => {
  if (chooseWay === ShopConstant.ALIPAY) {
    return await alipay(data);
  } else if (chooseWay === ShopConstant.WECHATPAY) {
    return await wechatPay(data);
  } else if (chooseWay === ShopConstant.DROPPAY) {
    return await dropPay(data);
  }
};

/**
 * 微信支付
 * @param data
 * @returns {Promise<void>}
 */
const wechatPay = async (data) => {
  // 判断是否支持微信支付
  let isSupported = await wxPayModule.isSupported();
  if (!isSupported) {
    showToast('找不到微信应用，请安装最新版微信');
    return;
  }
  // 调起微信客户端，发起支付
  let res = await wxPayModule.pay(data);
};

/**
 * 支付宝支付
 * @param data
 * @returns {Promise<void>}
 */
const alipay = async (data) => {
  let res = await alipayModule.pay(data);
  if (res) {
    let status = res.resultStatus;
    if (status == 6001) {
      return showToast('已取消本次支付');
    } else if (status == 6002) {
      return showToast(Strings.netError)
    }
    return ShopConstant.FINISHPAY;
  }
};

/**
 * drop平台支付
 * @returns {Promise<void>}
 */
const dropPay = async () => {
};

/**
 * 获取支付状态
 * @param {String} uAid - 团ID
 * @param {Number} type - 支付类型
 * @param navigation
 * @param {Object} shopInfo - 商品详情
 */
const getPayStatus = async (type, uAid, navigation, shopInfo) => {
  const params = {
    u_a_id: uAid,
    type: type
  };
  try {
    let res = await request('/pay/get_pay_status', {params, isShowLoading: true});
    if (res.data == 1) {
      showToast('支付成功');
      navigation.push('payStatus', {'payStatus': true, 'shopInfo': shopInfo})
    } else {
      showToast('支付失败，请重新支付');
    }
  } catch (e) {
  }
};
export {
  getCommisionInfo,
  getOrderInfo,
  pay,
  getPayStatus
}
