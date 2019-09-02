import { combineReducers } from 'redux';
import test from './test';
import userInfo from './userInfo';
import activityList from './activityList';
import shopDetailInfo from './shopDetailInfo';
import component from './component';
import orderState from './orderState';
import message from './message';

export default combineReducers({
  test,
  userInfo,
  activityList,
  shopDetailInfo,
  component,
  orderState,
  message,
});
