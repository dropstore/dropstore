import { handleActions } from 'redux-actions';
import ShopConstant from '../../common/ShopConstant';
import {
  requestActivityList, receiveActivityList, resetActivityList, notReceiveActivityList,
} from '../actions/activityList';

const initActivity = {
  [ShopConstant.ORIGIN_CONST]: {
    isFetching: false,
    error: false,
    currentPage: 1,
    totalPages: -1,
    limit: 10,
    list: [],
  },
  [ShopConstant.SELF_SUPPORT]: {
    isFetching: false,
    error: false,
    currentPage: 1,
    totalPages: -1,
    limit: 10,
    list: [],
  },
};

function setList(state, action) {
  let activityList = [];
  if (action.payload.currentPage > 1) {
    activityList = state[action.payload.type].list;
  }
  return [...activityList, ...action.payload.data.list];
}

const actions = {};
actions[requestActivityList] = (state, action) => ({
  ...state,
  [action.payload]: {
    ...state[action.payload],
    isFetching: true,
    error: false,
  },
});
actions[receiveActivityList] = (state, action) => ({
  ...state,
  [action.payload.type]: {
    isFetching: false,
    error: false,
    currentPage: action.payload.currentPage,
    totalPages: action.payload.data.number,
    limit: initActivity[action.payload.type].limit,
    list: setList(state, action),
  },
});

actions[resetActivityList] = (state, action) => ({
  ...state,
  [action.payload]: {
    ...state[action.payload],
    isFetching: false,
    error: false,
    currentPage: 1,
    totalPages: -1,
    limit: 10,
  },
});
actions[notReceiveActivityList] = (state, action) => ({
  ...state,
  [action.payload]: {
    isFetching: false,
    error: true,
    currentPage: 1,
    totalPages: -1,
    limit: 10,
    list: initActivity[action.payload].list,
  },
});
const reducer = handleActions(
  actions, initActivity,
);
export default reducer;
