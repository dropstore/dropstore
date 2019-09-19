import { combineReducers } from 'redux';
import userInfo from './userInfo';
import activityList from './activityList';
import shopDetailInfo from './shopDetailInfo';
import orderState from './orderState';
import banner from './banner';
import address from './address';
import moneyStream from './moneyStream';
import listData from './listData';

export default combineReducers({
  userInfo,
  activityList,
  shopDetailInfo,
  orderState,
  banner,
  address,
  moneyStream,
  listData,
});
