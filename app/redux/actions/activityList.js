import { createAction } from 'redux-actions';
import { request } from '../../http/Axios';

const requestActivityList = createAction('REQUEST_ACTIVITY_LIST');
const receiveActivityList = createAction('RECEIVE_ACTIVITY_LIST');
const resetActivityList = createAction('RESET_ACTIVITY_LIST');
const notReceiveActivityList = createAction('NOT_RECEIVE_ACTIVITY_LIST');

/**
 * 获取活动列表
 * @param {Number} type - 活动类型
 * @param {Boolean} fetchNextPage - 是否加载更多
 * @returns {Function}
 */
function getActivityList(type, { fetchNextPage = false } = {}) {
  return (dispatch, getState) => {
    const activityData = getState().activityList[type];
    const currentPage = activityData.currentPage;
    const page = fetchNextPage ? currentPage + 1 : 1;
    if (page === 1) {
      dispatch(resetActivityList(type));
    }
    // 解决FlatList 数据少于一屏多次触发onEndReached回调
    if (fetchNextPage && page > activityData.totalPages) {
      return;
    }
    const params = {
      type,
      limit: activityData.limit,
      pn: page,
    };
    dispatch(requestActivityList(type));
    request('/activity/activity_list', { params }).then((res) => {
      dispatch(receiveActivityList({ type, data: res.data, currentPage: page }));
    }).catch(() => {
      dispatch(notReceiveActivityList(type));
    });
  };
}

export {
  requestActivityList, receiveActivityList, resetActivityList, notReceiveActivityList, getActivityList,
};
