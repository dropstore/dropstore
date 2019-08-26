import {DeviceEventEmitter} from 'react-native';
import {request} from '../../http/Axios';
import {createAction} from 'redux-actions';

import {hideModalLoading, showModalLoading, showToast} from "../../utils/MutualUtil";
import {shopDetail1, tempData} from "../../page/TempData";
import ShopConstant from "../../common/ShopConstant";

const requestActivityList = createAction('REQUEST_ACTIVITY_LIST');
const receiveActivityList = createAction('RECEIVE_ACTIVITY_LIST');
const resetActivityList = createAction('RESET_ACTIVITY_LIST');


/**
 * 获取活动列表
 * @param {Number} type - 活动类型
 * @param {Boolean} fetchNextPage - 是否加载更多
 * @returns {Function}
 */
function getActivityList(type, {fetchNextPage = false} = {}) {
  return (dispatch, getState) => {
    const activityData = getState().activityList.activityData;
    const pn = fetchNextPage ? activityData.currentPage + 1 : 1;
    pn === 1 && dispatch(resetActivityList());
    const params = {
      type: type,
      limit: activityData.currentPage.limit,
      pn: pn,
    };
    request('/activity/activity_list', {params: params, type: 'form'}).then((res) => {
      dispatch(receiveActivityList({'data': res.list, 'currentPage': pn}));
    }).catch((err) => {
      dispatch(resetActivityList());
    })
  };
}

export {
  requestActivityList,
  receiveActivityList,
  resetActivityList,
  getActivityList
}
