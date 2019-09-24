import { request } from '../../http/Axios';
import { alipayModule, wxPayModule } from '../../native/module';
import ShopConstant from '../../common/ShopConstant';
import { showToast } from '../../utils/MutualUtil';
import Strings from '../../res/Strings';

/**
 * 获取订单信息并调用支付
 * @param type 支付类型 1订单 2佣金 3邮费
 * @param chooseWay 支付方式 1 支付宝 2 微信 3 drop平台
 * @param order_id 订单支付时传值(order_id) 佣金支付时传值(u_a_id) 邮费支付时传值(o_g_id)
 * @returns {Promise<*>}
 */
const getOrderInfo = async (type, chooseWay, order_id) => {
  const params = {
    order_id,
    type,
  };
  try {
    const res = await request('/pay/getAlipayOrder', { params, isShowLoading: true });
    const data = res.data;
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
  } if (chooseWay === ShopConstant.WECHATPAY) {
    return await wechatPay(data);
  } if (chooseWay === ShopConstant.DROPPAY) {
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
  const isSupported = await wxPayModule.isSupported();
  if (!isSupported) {
    showToast('找不到微信应用，请安装最新版微信');
    return;
  }
  // 调起微信客户端，发起支付
  const res = await wxPayModule.pay(data);
};

/**
 * 支付宝支付
 * @param data
 * @returns {Promise<void>}
 */
const alipay = async (data) => {
  const res = await alipayModule.pay(data);
  if (res) {
    const status = res.resultStatus;
    if (status == 6001) {
      return showToast('已取消本次支付');
    } if (status == 6002) {
      return showToast(Strings.netError);
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
const getPayStatus = async (type, uAid, navigation, shopInfo, buySuccess, noTimer, noShareBtn) => {
  const params = {
    u_a_id: uAid,
    type,
  };
  const res = await request('/pay/get_pay_status', { params, isShowLoading: true });
  if (res.data == 1) {
    showToast('支付成功');
    if (shopInfo) {
      navigation.push('PayStatus', {
        shopInfo, type, buySuccess, noTimer, noShareBtn, PayStatus: true,
      });
    } else {
      navigation.push('MyGoods', {
        title: '我的库房',
        type: 'warehouse',
      });
    }
  } else {
    showToast('支付失败，请重新支付');
  }
};
export {
  getOrderInfo,
  pay,
  getPayStatus,
};
