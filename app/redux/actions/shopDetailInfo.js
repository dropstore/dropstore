import {DeviceEventEmitter} from 'react-native';
import {request} from '../../http/Axios';
import {createAction} from 'redux-actions';

import {hideModalLoading, showModalLoading, showToast} from "../../utils/MutualUtil";
import ShopConstant from "../../common/ShopConstant";

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
function getShopDetail(shopId, {isDispatchStart = true} = {}) {
  return (dispatch) => {
    const params = {
      id: shopId,
    };
    if (isDispatchStart) {
      dispatch(requestShopDetailInfo());
    }
    request('/activity/activity_info', {params, isShowLoading: true}).then((res) => {
      dispatch(receiveShopDetailInfo(res.data))
    }).catch(() => {
      dispatch(notReceiveShopDetailInfo());
    })
  };
}

/**
 * 获取鞋码数据
 * @param shopId
 * @returns {Function}
 */
function getShoesList(shopId) {
  return (dispatch) => new Promise((resolve, reject) => {
    const params = {
      id: shopId,
    };
    request('/activity/activity_size', {params, isShowLoading: true}).then((res) => {
      let data = res.data;
      if (!(data && data.length)) {
        return showToast('暂无数据');
      }
      dispatch(receiveShoesList(data));
      resolve(true)
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 团长开团
 */
const startGroup = (activity_id, size_list) => {
  const params = {
    activity_id: activity_id,
    size_list: size_list
  };
  request('/activity/do_add_user_activity', {params, isShowLoading: true}).then((res) => {
    // 开团成功后刷新活动详情
    DeviceEventEmitter.emit(ShopConstant.REFRESH_SHOP_DETAIL_INFO, true);
  }).catch((err) => {
  })
};

export {
  requestShopDetailInfo,
  receiveShopDetailInfo,
  notReceiveShopDetailInfo,
  receiveShoesList,
  getShopDetail,
  getShoesList,
  startGroup
}
