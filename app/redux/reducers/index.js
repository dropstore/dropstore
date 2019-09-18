import { combineReducers } from 'redux';
import test from './test';
import userInfo from './userInfo';
import activityList from './activityList';
import shopDetailInfo from './shopDetailInfo';
import component from './component';
import orderState from './orderState';
import notice from './notice';
import banner from './banner';
import address from './address';
import moneyStream from './moneyStream';

export default combineReducers({
  test,
  userInfo,
  activityList,
  shopDetailInfo,
  component,
  orderState,
  notice,
  banner,
  address,
  moneyStream,
});
