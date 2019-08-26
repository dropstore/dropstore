import { combineReducers } from 'redux';
import test from './test';
import userInfo from './userInfo';
import activityList from './activityList';
import shopDetailInfo from './shopDetailInfo';

export default combineReducers({
  test,
  userInfo,
  activityList,
  shopDetailInfo,
});
