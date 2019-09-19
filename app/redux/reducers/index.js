import { combineReducers } from 'redux';
import userInfo from './userInfo';
import activityList from './activityList';
import shopDetailInfo from './shopDetailInfo';
import orderState from './orderState';
import notice from './notice';
import banner from './banner';
import address from './address';
import moneyStream from './moneyStream';

export default combineReducers({
  userInfo,
  activityList,
  shopDetailInfo,
  orderState,
  notice,
  banner,
  address,
  moneyStream,
});
