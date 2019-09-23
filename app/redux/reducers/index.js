import { combineReducers } from 'redux';
import userInfo from './userInfo';
import activityList from './activityList';
import shopDetailInfo from './shopDetailInfo';
import banner from './banner';
import address from './address';
import moneyStream from './moneyStream';
import listData from './listData';
import simpleData from './simpleData';

export default combineReducers({
  userInfo,
  activityList,
  shopDetailInfo,
  banner,
  address,
  moneyStream,
  listData,
  simpleData,
});
