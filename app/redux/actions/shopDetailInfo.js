import {createAction} from 'redux-actions';
import {request} from '../../http/Axios';
import {hideToastLoading, showToastLoading} from "../../utils/MutualUtil";

const requestShopDetailInfo = createAction('REQUEST_SHIP_DETAIL_INFO');
const receiveShopDetailInfo = createAction('RECEIVE_SHOP_DETAIL_INFO');
const notReceiveShopDetailInfo = createAction('NOT_RECEIVE_SHOP_DETAIL_INFO');

function getShopDetail(shopDetail) {
  return (dispatch) => {
    // const params = {
    //   id: id,
    // };
    showToastLoading();
    dispatch(requestShopDetailInfo());
    setTimeout(() => {
      dispatch(receiveShopDetailInfo(shopDetail))
      hideToastLoading();
    }, 3000)
    // request('/activity/activity_info', {params}).then((res) => {
    //   dispatch(receiveShopDetailInfo(res.data))
    // }).catch((err) => {
    //   dispatch(notReceiveShopDetailInfo(err))
    // })
  };
}

export {
  requestShopDetailInfo,
  receiveShopDetailInfo,
  notReceiveShopDetailInfo,
  getShopDetail
}
