import {handleActions} from 'redux-actions';
import {
  requestActivityList,
  receiveActivityList,
  resetActivityList
} from '../actions/activityList';

const initActivity = {
  activityData: {
    isFetching: false,
    isSuccess: false,
    currentPage: 1,
    totalPages: -1,
    limit: 10,
    list: []
  }
};

function setList(state, action) {
  let activityList = [];
  if (action.payload.currentPage > 1) {
    activityList = state.activityData.list;
  }
  return [...activityList, ...action.payload.data.list];
}

const actions = {};
actions[requestActivityList] = (state) => {
  return {
    ...state,
    activityData: {...state.shopData, isFetching: true}
  }
};
actions[receiveActivityList] = (state, action) => {
  return {
    ...state,
    activityData: {
      isFetching: false,
      isSuccess: true,
      currentPage: action.payload.currentPage,
      totalPages: action.payload.data.number,
      limit: initActivity.activityData.limit,
      list: setList(state, action),
    }
  }
};

actions[resetActivityList] = (state) => {
  return {
    ...state,
    shoesData: {
      activityData: initActivity.activityData
    },
  }
};

const reducer = handleActions(
  actions, initActivity
);
export default reducer
