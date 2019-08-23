import {DeviceEventEmitter} from 'react-native';
import {createAction} from 'redux-actions';

import {hideModalLoading, showModalLoading} from "../../utils/MutualUtil";
import {shopDetail1} from "../../page/TempData";
import ShopConstant from "../../common/ShopConstant";

const requestShopDetailInfo = createAction('REQUEST_SHIP_DETAIL_INFO');
const receiveShopDetailInfo = createAction('RECEIVE_SHOP_DETAIL_INFO');
const notReceiveShopDetailInfo = createAction('NOT_RECEIVE_SHOP_DETAIL_INFO');
const receiveShoesList = createAction('RECEIVE_SHOP_SHOE_LIST');

/**
 * 获取商品详情
 * @param shopDetail
 * @param isDispatchStart
 * @returns {Function}
 */
function getShopDetail(shopDetail, {isDispatchStart = true} = {}) {
  return (dispatch) => {
    // const params = {
    //   id: id,
    // };
    showModalLoading();
    if (isDispatchStart) {
      dispatch(requestShopDetailInfo());
    }
    setTimeout(() => {
      // dispatch(receiveShopDetailInfo({'activity_id':id,'shopDetail':shopDetail}));
      dispatch(receiveShopDetailInfo({'shopDetail': shopDetail}));
      hideModalLoading();
    }, 500)
    // request('/activity/activity_info', {params}).then((res) => {
    //   dispatch(receiveShopDetailInfo(res.data))
    // }).catch((err) => {
    //   dispatch(notReceiveShopDetailInfo(err))
    // })
  };
}

/**
 * 获取鞋码数据
 * @param shoesList
 * @returns {Function}
 */
function getShoesList(shoesList) {
  return (dispatch) => new Promise((resolve, reject) => {
    showModalLoading({isModal: false});
    setTimeout(() => {
      // dispatch(receiveShopDetailInfo({'activity_id':id,'shoesList':shoesList}));
      dispatch(receiveShoesList({'shoesList': shoesList}));
      resolve(true);
      hideModalLoading();
    }, 500)

    // request('/activity/activity_info', {params}).then((res) => {
    // let data = res.data;
    // if(!(data && data.length)){
    //   return showToast('暂无数据');
    // }
    //  dispatch(receiveShoesList(data))
    // }).catch((err) => {
    //
    // })
  });
}

/**
 * 团长开团
 */
const startGroup = (shoesList) => {
  // const params = {
  // activity_id: activity_id,
  // size_list:size_list
  // };
  showModalLoading();
  setTimeout(() => {
    hideModalLoading();
    DeviceEventEmitter.emit(ShopConstant.REFRESH_SHOP_DETAIL_INFO, true);
  }, 500)
  // request('/activity/do_add_user_activity', {params}).then((res) => {
  // 开团成功后刷新活动详情
  //  DeviceEventEmitter.emit(ShopConstant.REFRESH_SHOP_DETAIL_INFO, true);
  // }).catch((err) => {
  //
  // })
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
