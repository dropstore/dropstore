import ShopConstant from '../../common/ShopConstant';
import {handleActions} from 'redux-actions';
import {
  requestActivityList,
  receiveActivityList,
  resetActivityList,
  notReceiveActivityList
} from '../actions/activityList';

const initActivity = {
  [ShopConstant.HOME]: {
    isFetching: false,
    isSuccess: false,
    isSendRequest: false,
    currentPage: 1,
    totalPages: -1,
    limit: 10,
    list: []
  },
  [ShopConstant.ORIGIN_CONST]: {
    isFetching: false,
    isSuccess: false,
    isSendRequest: false,
    currentPage: 1,
    totalPages: -1,
    limit: 10,
    list: []
  },
  [ShopConstant.SELF_SUPPORT]: {
    isFetching: false,
    isSuccess: false,
    isSendRequest: false,
    currentPage: 1,
    totalPages: -1,
    limit: 10,
    list: []
  },
  [ShopConstant.LUCKY_CHARM]: {
    isFetching: false,
    isSuccess: false,
    isSendRequest: false,
    currentPage: 1,
    totalPages: -1,
    limit: 10,
    list: []
  },
  [ShopConstant.RESERVE]: {
    isFetching: false,
    isSuccess: false,
    isSendRequest: false,
    currentPage: 1,
    totalPages: -1,
    limit: 10,
    list: []
  }
};

function setList(state, action) {
  let activityList = [];
  if (action.payload.currentPage > 1) {
    activityList = state[action.payload.type].list;
  }
  return [...activityList, ...action.payload.data.list];
}

const actions = {};
actions[requestActivityList] = (state, action) => {
  return {
    ...state,
    [action.payload]: {
      isFetching: true,
      isSuccess: false,
      isSendRequest: false,
      currentPage: 1,
      totalPages: -1,
      limit: 10,
      list: []
    }
  }
};
actions[receiveActivityList] = (state, action) => {
  return {
    ...state,
    [action.payload.type]: {
      isFetching: false,
      isSuccess: true,
      isSendRequest: true,
      currentPage: action.payload.currentPage,
      totalPages: action.payload.data.number,
      limit: initActivity[action.payload.type].limit,
      list: setList(state, action),
    },
  }
};

actions[resetActivityList] = (state, action) => {
  return {
    ...state,
    [action.payload]: {
      isFetching: false,
      isSuccess: false,
      isSendRequest: false,
      currentPage: 1,
      totalPages: -1,
      limit: 10,
      list: []
    }
  }
};
actions[notReceiveActivityList] = (state, action) => {
  return {
    ...state,
    [action.payload]: {
      isFetching: false,
      isSuccess: false,
      isSendRequest: true,
      currentPage: 1,
      totalPages: -1,
      limit: 10,
      list: []
    }
  }
};
const reducer = handleActions(
  actions, initActivity
);
export default reducer
