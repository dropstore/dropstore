import { DeviceEventEmitter } from 'react-native';
import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';
import { showToast } from '../../utils/MutualUtil';
import ShopConstant from '../../common/ShopConstant';

const requestShopDetailInfo = createAction('REQUEST_SHIP_DETAIL_INFO');
const receiveShopDetailInfo = createAction('RECEIVE_SHOP_DETAIL_INFO');
const notReceiveShopDetailInfo = createAction('NOT_RECEIVE_SHOP_DETAIL_INFO');
const receiveShoesList = createAction('RECEIVE_SHOP_SHOE_LIST');

/**
 * 获取商品详情
 * @param shopId
 * @param isDispatchStart
 * @returns {Function}
 */
function getShopDetail(shopId, { isDispatchStart = true } = {}) {
  return (dispatch) => {
    const params = {
      id: shopId,
    };
    if (isDispatchStart) {
      dispatch(requestShopDetailInfo());
    }
    request('/activity/activity_info', { params, isShowLoading: true, image_size_times: 1 }).then((res) => {
      dispatch(receiveShopDetailInfo(res.data));
    }).catch(() => {
      dispatch(notReceiveShopDetailInfo());
    });
  };
}

/**
 * 获取鞋码数据
 * @param shopId
 * @returns {Function}
 */
function getShoesList(shopId) {
  return dispatch => new Promise((resolve) => {
    const params = {
      id: shopId,
    };
    request('/activity/activity_size', { params, isShowLoading: true }).then((res) => {
      const data = res.data;
      if (!(data && data.length)) {
        return showToast('暂无数据');
      }
      dispatch(receiveShoesList(data));
      resolve(data);
    });
  });
}

/**
 * 团长开团
 * @param activity_id
 * @param size_list
 */
const startGroup = (activity_id, size_list) => {
  const toServerSizeList = [];
  for (let i = 0; i < size_list.length; i++) {
    const sizeData = size_list[i];
    if (sizeData.num !== 0) {
      toServerSizeList.push({
        id: sizeData.id,
        num: sizeData.num,
      });
    }
  }
  const params = {
    activity_id,
    size_list: JSON.stringify(toServerSizeList),
  };
  request('/activity/do_add_user_activity', { params, isShowLoading: true }).then(() => {
    // 开团成功后刷新活动详情
    DeviceEventEmitter.emit(ShopConstant.REFRESH_SHOP_DETAIL_INFO, true);
  });
};

/**
 * 填写佣金
 * @param activity_id
 * @param u_a_id
 */
const getPayMes = (activity_id, u_a_id) => {
  const params = {
    activity_id,
    u_a_id,
  };
  return request('/activity/pay_activity', { params, isShowLoading: true });
};

/**
 * 设置佣金
 * @param activity_id
 * @param u_a_id
 * @param commission
 */
const setCommission = (activity_id, u_a_id, commission) => {
  const params = {
    activity_id,
    u_a_id,
    commission,
  };
  return request('/activity/set_commission', { params, isShowLoading: true });
};

/**
 * 团长抢购或团员参加
 * @param {Boolean} isLeading - 是否是团长
 * @param {String} activity_id - 活动ID
 * @param navigation
 * @param {Object} shopInfo - 活动详情
 */
const doBuy = async (isLeading, activity_id, navigation, shopInfo) => {
  const url = isLeading ? '/order/do_buy' : '/order/do_help_buy';
  const params = { activity_id };
  try {
    const res = await request(url, { params, isShowLoading: true });
    if (res) {
      navigation.push('Panicstatus', { shopInfo, payData: res.data, Panicstatus: true });
    } else {
      navigation.push('Panicstatus', { shopInfo, Panicstatus: false });
    }
  } catch (e) {
    navigation.push('Panicstatus', { shopInfo, Panicstatus: false });
  }
};

/**
 * 直接参加
 * @param activity_id
 * @param size_id
 * @param navigation
 * @param shopInfo
 */
const doBuyNow = (activity_id, size_id, navigation, shopInfo) => {
  const params = {
    activity_id,
    size_id,
  };
  request('/order/do_buy_now', { params, isShowLoading: true }).then((res) => {
    navigation.push('Panicstatus', { shopInfo, payData: res.data, Panicstatus: true });
  });
};
export {
  requestShopDetailInfo, receiveShopDetailInfo, notReceiveShopDetailInfo,
  receiveShoesList, getShopDetail, getShoesList, startGroup, getPayMes,
  setCommission, doBuy, doBuyNow,
};
