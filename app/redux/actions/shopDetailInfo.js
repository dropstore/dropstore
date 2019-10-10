import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';
import { showToast } from '../../utils/MutualUtil';

const requestShopDetailInfo = createAction('REQUEST_SHIP_DETAIL_INFO');
const receiveShopDetailInfo = createAction('RECEIVE_SHOP_DETAIL_INFO');
const notReceiveShopDetailInfo = createAction('NOT_RECEIVE_SHOP_DETAIL_INFO');
const receiveShoesList = createAction('RECEIVE_SHOP_SHOE_LIST');

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

export {
  requestShopDetailInfo, receiveShopDetailInfo, notReceiveShopDetailInfo,
  receiveShoesList, getShoesList, getPayMes,
  setCommission,
};
