import {request} from '../../http/Axios';
import {createAction} from 'redux-actions';
import {requestVendors} from "./test";
import ShopConstant from "../../common/ShopConstant";

const requestActivityList = createAction('REQUEST_ACTIVITY_LIST');
const receiveActivityList = createAction('RECEIVE_ACTIVITY_LIST');
const resetActivityList = createAction('RESET_ACTIVITY_LIST');
const notReceiveActivityList = createAction('NOT_RECEIVE_ACTIVITY_LIST');


/**
 * 获取活动列表
 * @param {Number} type - 活动类型
 * @param {Boolean}isReset - 是否清空数据
 * @param {Boolean} fetchNextPage - 是否加载更多
 * @returns {Function}
 */
function getActivityList(type, {isReset = false, fetchNextPage = false} = {}) {
  return (dispatch, getState) => {
    const activityData = getState().activityList[type];
    const currentPage = activityData.currentPage;
    const pn = fetchNextPage ? currentPage + 1 : 1;
    pn === 1 && isReset && dispatch(resetActivityList(type));

    // 解决FlatList 数据少于一屏多次触发onEndReached回调
    if (fetchNextPage && pn > activityData.totalPages) {
      return;
    }
    const params = {
      type: type,
      limit: activityData.limit,
      pn: pn,
    };
    dispatch(requestActivityList(type));
    request('/activity/activity_list', {params: params, type: 'form'}).then((res) => {
      dispatch(receiveActivityList({'type': type, 'data': res.data, 'currentPage': pn}));
    }).catch(() => {
      dispatch(notReceiveActivityList(type));
    })
  };
}

export {
  requestActivityList,
  receiveActivityList,
  resetActivityList,
  notReceiveActivityList,
  getActivityList
}
